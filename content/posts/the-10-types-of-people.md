---
title: "The 10 Types of People"
date: "2013-12-28"
category: "compsci"
tags: 
  - "compsci-in-plain-english"
---

We’ve now established that knowing the base of a number system is crucial to counting, and that computers exclusively use the binary number system i.e. base-two. You may well have seen a calculator application on your phone or desktop computer that works perfectly normally using decimal. How can that be if everything a computer does is in binary?

 

_New to this blog? This is the third in an ongoing series of blog posts about teaching Computer Science in plain English from scratch i.e. for non-programmers and other non-technical people. Use this [link](http://lifebeyondfife.com/tag/compsci-in-plain-english/) to follow the series._

 

As with foreign languages, once the grammatic rules and vocabulary are known, we can translate from one language into another. Computers are constantly doing this for us. Every time we give them a calculation – or indeed, any kind of computational task – they transform whatever input we give them into binary, perform the task requested, and translate the result back into decimal for us.

 

Every time we interact with a computer we’re giving it instructions whether it’s typing a search term in a browser or swiping left on a touchscreen. In each case these instructions are captured in some way by a computer program that was written by a software developer, and transformed into commands that the computer can understand. There are many different ways to write computer programs but as this is not a guide to programming but rather an introduction to Computer Science, we won’t look into the vast world of programming platforms, frameworks and languages. Suffice it to say at this stage, that a software engineer, software developer or computer programmer, is someone who writes instructions that a computer can understand, and creates an easy to use interface to these instructions e.g. the search term or swipe gesture mentioned at the beginning of the paragraph.

 

It’s incorrect of me to use the word “understand”, however. Computers don’t understand in the sense humans do. They accept instructions and execute them. If the instructions given to them do not fit the structure within which they are specified to work, the result could be anything. For example, consider a basic computer program that is designed to add two decimal numbers together. This particular program, being extremely limited, can only return single digit answers. If you provide the program with 2 and 5, it will correctly return 7. If you provide 5 and 8, it is unknown how the program will behave – it depends upon how the human who wrote the program anticipated invalid inputs. The program may return 3, the value of the units column of the full answer 13; it may return a non-numeric symbol to signify an error e.g. ‘!’; or the program might terminate itself.

 

Regardless of the response you receive, it's not a conscious choice by the computer but rather a deterministic choice by the person who wrote the program. Computers are dumb machines. If the computer does not behave in the way you expect, it is not the fault of the computer but rather of a human, whether that be the creator or user of the program currently running. Think of a computer as a chef and a program as a recipe. The programmer provides the recipe (instructions) and the user of the program provides the input (ingredients). If the resulting meal (output) is a burnt crisp or an unrisen soufflé, it’s not the fault of the chef, who performs exactly as instructed, but rather the recipe or ingredients.

 

Given that a computer is a dumb machine, it executes the instructions it’s given whether they are correct or not. We have in our minds what makes an instruction correct by whether the resulting output of the program matches what we expected. If I give a program 5 and 8 and want to know the sum, I’m happy that the correct instructions must have been followed if I receive the output 13. But what if it doesn’t come back with 13, what if it comes back with 14, or 15. Or -2,147,483,635?

 

For users of computer programs this is likely impossible to know. Those writing the programs, however, usually have tools at their disposal to look at the instructions being executed one at a time. They might also be able to look at the same memory stores that the computer is using. As stated earlier though, these data stored in the computer’s memory aren’t in a form usable by humans but instead a binary representation of numbers or codes. When a computer is given an instruction to perform a basic arithmetic sum, they achieve this by calculating the mathematical operation in binary before converting the result back into decimal. But numbers and arithmetic are just one aspect of the myriad of instructions that a computer can execute.

 

To be a programmer means understanding how computers work, how they execute the instructions we humans give them, the changes our instructions make to their data and what these data mean. It’s not just simply the computer’s representation of numbers that programmers have to understand, it’s all the logical rules too.

 

People employed to write computer programs are concerned with delivering powerful functionality with a certain degree of reliability. The years they spend learning their craft means they use highly complex tools which aid their existing understanding of Computer Science to produce programs that we use everyday on our various electronic devices.

 

Before looking further into complex tools such as these, we’ll start out learning the basic building blocks of the simplest computer instructions: binary logic gates acting upon binary data. By doing so we’ll have an understanding of the foundations of how computers work. We begin this by showing how to work with binary numbers, something computers are constantly doing for us.

 

## 1 plus 1 is 10?

 

For number systems with a concept of zero, the rules around counting are the same regardless of the size of the base. We can take what we’ve learned from dealing with the Mayans, what we already know about how decimal works and use our experience to look at some examples of counting in binary.

 

There are a some advantages when dealing with binary compared to the Mayan’s base-twenty system. Because two is less than ten, we will have fewer digits to remember than are in our decimal system. For example, another number system that is sometimes used in Computer Science is hexadecimal, which is base-sixteen. Hexadecimal uses the digits from decimal (0 to 9) and then the first six letters of the alphabet (A to F, where A is ten, B is eleven etc. up to F which is fifteen). Binary is much simpler in that, not only are the digits used the same as those in decimal, but there are only two of them: 0 and 1.

 

Before we go any further and make things confusing, we need to have a convention for saying what base a number is. For example, $110$ in decimal is one hundred and ten, but $110$ in binary is six. From now on, non-decimal numbers expressed as digits will have a subscript suffix to denote which base it is e.g. $110_{base2}$ signifies that $110$ is in base-two (binary) which is the same as $6$ in base-ten (decimal).

 

As stated earlier, the rules for counting are always the same, it’s just the base that’s different. And the base determines the multiplier for each column. For decimal i.e. base-ten, the bases are one and the multiples of ten: one, ten, one hundred, one thousand etc. For binary i.e. base-two, the bases are one and the multiples of two: one, two, four, eight, sixteen, thirty-two etc.

 

| _64_ | _32_ | _16_ | _8_ | _4_ | _2_ | _1_ |   |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 0 | 1 | \= 1 |
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | \= 6 |
| 0 | 0 | 1 | 0 | 1 | 0 | 1 | \= 21 |
| 1 | 1 | 0 | 1 | 1 | 1 | 0 | \= 110 |

 

The rules for performing arithmetic work exactly the same way too.

 

Below we add $110_{base2}$ ($6$) and $101_{base2}$ ($5$) to get the expected $1011_{base2}$ ($11$). The addition in the first two right-hand columns, $0 + 1$ and $1 + 0$, results in a $1$. However, $1 + 1$ equals two, of which there is no single digit representation in binary. The most basic addition of one and one in binary results in cycling the current column back to zero and adding one to the next column up. In others words, in binary, $1 + 1 = 10$. In the case of this sum, one plus one is zero with a one carried over to the next column.

 
```
   1 1 0
 + 1 0 1
 ———————
 1 0 1 1
```
 

Now consider $11_{base2}$ plus $11_{base2}$ ($3$) which is $110_{base2}$ ($6$). The first addition on the right-hand column results in $1 + 1 = 10$, or “zero with one carried over”. This means the next columns addition is $1 + 1 + 1$ (carried over from the previous column). Evaluating further this is $10 + 1$ which is $11$, or “one with one carried over”.

 
```
   1 1
 + 1 1
 —————
 1 1 0
```
 

Every other binary addition exercise employs these techniques repeatedly. Come back to these examples as required because it’s not expected that you’ll master arithmetic in a different base instantly. Hopefully the principles you apply when performing decimal addition can be seen in binary addition. Similarly, the technique is the same for binary subtraction.

 

Consider $111_{base2}$ ($7$) minus $11_{base2}$ ($3$) which is $100_{base2}$ ($4$). This is a straightforward subtraction where we only have single digit operations that can be fully evaluated one column at a time i.e. we only have $1 - 1$ and $1 - 0$ subtractions to deal with (which are $0$ and $1$ respectively).


```
 1 1 1
 - 1 1
 —————
 1 0 0
```

 

In the next example we subtract $1001_{base2}$ ($9$) by $110_{base2}$ ($6$) which is $11_{base2}$ ($3$). The first and most right-hand subtraction, $1 - 0 = 1$. The next subtraction, $0 - 1$, requires us to “borrow” one from the next superior column, just as we would performing decimal subtraction. However, in this case the next column up is also a zero. As with decimal subtraction, continue up the columns until a $1$ digit is found. Recall that two $1$ digits in the current column $(1 + 1)$ can be represented as a $0$ with a $1$ carried over to the next higher column i.e. $1 + 1 = 10$. Similarly, a $1$ digit in the current column is worth _two_ $1$ digits in the previous, right-hand column. Thus, the leftmost $1$ digit in this subtraction is turned into two $1$ digits in the previous column. One of these $1$ digits is split into two $1$ digits for the previous right-hand column. This replaces the $0 - 1$ subtraction with $(1 + 1) - 1$ which is $1$.


```
 1 0 0 1
 - 1 1 0
 ———————
 ? ? ? 1
```

```
 0 1+1 0 1
 -   1 1 0
 —————————
 ?   ? ? 1
```

```
 0 1 1+1 1
 - 1   1 0
 —————————
 ?   ? ? 1
```

```
 0 1 1+1 1
 - 1   1 0
 —————————
 0 0   1 1
```

 

Don’t worry if this doesn’t quite click to begin with. Come back to it again with a clear head later – good advice for anything technical you’ve been looking at for a while.

 

The act of adding and subtracting numbers in binary may seem clunky and pointless when it can be done easily in decimal using a calculator. Comfortably working with binary numbers, however, is very important in low-level Computer Science.

 

Addition and subtraction (as well as multiplication and division) are _binary operations_. An operation, also known as an operator, is an an action or function; a “doing thing”. The elements they operate upon are the data. A binary operation works specifically on two pieces of datum, known as operands. So for $3 + 5$, the operation (+) is addition and three and five are the two operands. Note that in this case the binary in binary operation refers to the fact that there are two inputs, not that the data is binary e.g. the addition operator is always binary regardless of whether it's adding binary numbers or decimal numbers.

 

The arithmetic operations will be known to all: +, -, ×, ÷. Computer Science deals with many other binary operators which are mentioned now in passing but will be introduced more formally later. The main ones are AND, OR and XOR (pronounced “ex or” or “exclusive or”) but there are others such as left and right shift, and also the unary operator NOT.

 

Addition and subtraction were explained first because most will already be happily familiar with how they work on decimal operands. One way to help master the technique of working with binary arithmetic is to create some of your own examples similar to those above. By converting the two input operands to decimal you can work out what answer it should be and that answer can be converted to binary so you can see what you should get.

 

Which is where we'll pick things up again next time, with the most important lesson so far: converting numbers to and from different bases. Gauge your progress thus far by seeing if you understand the old geek joke, “There are 10 types of people. Those who understand binary, and those who don’t.”
