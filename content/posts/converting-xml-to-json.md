---
title: "Converting XML to JSON"
date: "2014-07-12"
category: "coding"
tags: 
  - "development-in-practice"
  - "json"
  - "python"
  - "xml"
---

XML and JSON are the two most common generic standards for passing representation state information in web APIs. So when I recently needed to convert XML to JSON, I didn't even think about the structure of XML, I simply looked for a library to do it.

"Why isn't there a library to do this?" I thought. Quite simply, because you cannot express XML as JSON and vice versa. There are too many grey areas where a choice needs to be made about how the conversion should be done. A lack of bijective one-to-one mapping means that no-one will create a library because it will be either a narrow solution good for only a subset of all use cases, or it will require extensive configuration to map the grey areas. Neither of these makes a compelling case for a software library.

But regardless, I've made one that solves at least one of the use cases.

## Why can't XML be converted to JSON?

There are three concepts in a block of XML that have no counterpart in JSON.

1. Namespaces
2. Attributes
3. XSD missing to signify list types

So that we might create a method of converting XML to JSON, the following issues will be dealt with by:

1. Ignoring namespaces
2. Flattening attributes into elements
3. Inferring list types

Namespaces. An XML element may have an optional namespace element e.g.

<mynamespace:h1></mynamespace:h1>

Namespaces are used to allow the same element names to be used in the same document from differing origins e.g. <thirdpartylibrary:connectionstring> and <ourinternal:connectionstring>. To simplify the conversion property, namespaces shall be ignored.

Attributes. An XML element can be made of sub-elements and also attributes e.g.

   <myelement myAttribute\="123"\>
      <otherelement> 3.9 </otherelement>
   </myelement>

Likewise, JSON has no concept of an attribute, only elements. This will be solved by converting attributes into elements.

Lists. A JSON instance is clear about whether an element is an object, or a list of object because this can be inferred from the use of either {} braces or \[\] brackets. However, this is not always the case with XML. Given the following,

    <mycollection>
        <item>1</item>
        <item>2</item>
        <item>3</item>
    </mycollection>

we can infer that a single myCollection element is a list of item elements.

    <myinstance>
        <item>1</item>
        <otheritem>2</otheritem>
        <somethingelse>3</somethingelse>
    </myinstance>

Above, we see that myInstance is an element made up of a combination of three different elements. But what about this?

    <someelement>
        <item>1</item>
    </someelement>

Is this an object or a list? Without holding the XSD for the XML document in question we simply don't know. Even the earlier example made up of three item elements, _could_ be an object. We don't know for certain. In order to simplify the problem, an element made up only of two or more identical elements will be deemed to be a list, otherwise it's an object.

## A sample converter in Python

With these arbitrary choices made on behalf of the user, here is a succinct implementation that will convert an lxml object in Python into a native object that can be rendered as a JSON string using the json library.

from lxml import objectify
from json import dumps

def \_flatten\_attributes(property\_name, lookup, attributes):
    if attributes is None:
        return lookup

    if not isinstance(lookup, dict):
        return dict(attributes.items() + \[(property\_name, lookup)\])

    return dict(lookup.items() + attributes.items())

def \_xml\_element\_to\_json(xml\_element, attributes):
    if isinstance(xml\_element, objectify.BoolElement):
        return \_flatten\_attributes(xml\_element.tag, bool(xml\_element), attributes)

    if isinstance(xml\_element, objectify.IntElement):
        return \_flatten\_attributes(xml\_element.tag, int(xml\_element), attributes)

    if isinstance(xml\_element, objectify.FloatElement):
        return \_flatten\_attributes(xml\_element.tag, float(xml\_element), attributes)

    if isinstance(xml\_element, objectify.StringElement):
        return \_flatten\_attributes(xml\_element.tag, str(xml\_element).strip(), attributes)

    return \_flatten\_attributes(xml\_element.tag, \_xml\_to\_json(xml\_element.getchildren()), attributes)

def \_xml\_to\_json(xml\_object):
    attributes = None
    if hasattr(xml\_object, "attrib") and not xml\_object.attrib == {}:
        attributes = xml\_object.attrib

    if isinstance(xml\_object, objectify.ObjectifiedElement):
        return \_xml\_element\_to\_json(xml\_object, attributes)

    if isinstance(xml\_object, list):
        if len(xml\_object) > 1 and all(xml\_object\[0\].tag == item.tag for item in xml\_object):
            return \[\_xml\_to\_json(attr) for attr in xml\_object\]

        return dict(\[(item.tag, \_xml\_to\_json(item)) for item in xml\_object\])

    return Exception("Not a valid lxml object")

def xml\_to\_json(xml):
    xml\_object = xml if isinstance(xml, objectify.ObjectifiedElement) \\
                     else objectify.fromstring(xml)
    return dumps({xml\_object.tag: \_xml\_to\_json(xml\_object)})

Have a look at the code in full at my [GitHub account](http://github.com/lifebeyondfife/XMLtoJSON).
