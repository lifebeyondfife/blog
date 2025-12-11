---
title: "Confusing Christmas with Halloween"
date: "2014-02-28"
category: "compsci"
tags: 
  - "compsci-in-plain-english"
---

Understanding how computers work is essential in allowing us to use them as tools. We therefore need to translate some of their codes and numbers to things that we more naturally understand. Unfortunately, there’s no escaping the mathematics of it – converting binary numbers to decimal and vice versa is an algebraic operation. Though it can be done with a scientific calculator, the process is straightforward and can be done simply enough with a pen and some paper.

 

To convert from binary to decimal is the easiest base transformation there is. We’ll walk through an example by converting $1001 \space 1010$ (the space is included for much the same reason we use commas to partition decimal numbers into groups of three, to make it easier to read). Begin by writing down the binary powers. Starting from the far right, the powers begin with $1$ and double in size. $1, 2, 4, 8, 16, 32, 64, 128$. Calculate as many powers as there are digits in the number, in this case there are eight. Next line up the powers with the binary digits.


| _128_ | _64_ | _32_ | _16_ | _8_ | _4_ | _2_ | _1_ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |


Every power next to a zero is discarded. The rest of the remaining powers are added together. $128 + 16 + 8 + 2 = 154$. To be technically correct, the number in each column is multiplied by the base. As we’re dealing with binary, the only non-zero number is a one which doesn’t change the original number under multiplication. To give an example of converting a number from a different base to decimal, we will look at the previously mentioned base sixteen: hexadecimal.

 

This is a useful base for Computer Science because sixteen is a power of two, specifically it’s two to the power of four i.e. $2^{4} = 2 \times 2 \times 2 \times 2 = 16$. One of the most crucial parts to the performance of a modern computing device is how much memory it has, a figure usually measured in gigabytes. Giga (pronounced with a hard ‘g’ and not a ‘j’ Doc Brown) is an engineering term which is short hand for a billion. A byte is a standard small measurement of a binary number with eight digits. You may think that a gigabyte would therefore be a billion bytes but alas, it’s $1,073,741,824$ bytes, just over $7%$ larger than a round billion. More on why that is later.

 

A single byte can be used to store a number from $0000 \space 0000$ up to $1111 \space 1111$ which is... well, we should probably work this out.


| _128_ | _64_ | _32_ | _16_ | _8_ | _4_ | _2_ | _1_ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |


It’s exactly the sum of the first eight base two powers: $128 + 64 + 32 +16 + 8 + 4 + 2 + 1$, which is $255$. Notice that $255$ is one less than the next base two power, $256$. This is similar to $99$ in decimal – the largest two digit number – being one less than the third decimal power, $100$.

 

Say we wanted to represent a byte (eight binary digits) as a decimal number, how many decimal digits would that require? Seeing as a byte can represent any number from $0$ to $255$, three digits would be required. But that’s rather wasteful because those three digits can represent more than just one byte. Three decimal digits could also represent 256 which uses nine binary digits $1 \space 0000 \space 0000$. Or $999$ which requires ten binary digits $11 \space 1110 \space 0111$.

 

Hexadecimal isn’t wasteful however. The fact that sixteen is a power of two means that we can model some binary number lengths exactly without any leftover digits. After mastering the Mayan base twenty, this number system should be less tricky because it shares the ten digits from decimal, and six letter from the Latin alphabet. Decimal is abbreviated to DEC and hexadecimal to HEX.


| _DEC_ | _HEX_ |
| --- | --- |
| 0 | 0 |
| 1 | 1 |
| 2 | 2 |
| 3 | 3 |
| 4 | 4 |
| 5 | 5 |
| 6 | 6 |
| 7 | 7 |
| 8 | 8 |
| 9 | 9 |
| 10 | A |
| 11 | B |
| 12 | C |
| 13 | D |
| 14 | E |
| 15 | F |



And to complete the cycle $16\_{DEC} = 10\_{HEX}$.

 

The same technique for translating binary to decimal works for transforming hexadecimal to decimal. Begin with $123\_{HEX}$. This number has three digits so we need the first three powers of sixteen, namely, $16^{0}$, $16^{1}$ and $16^{2}$. Or $1, 16$ and $256$.

 
| _256_ | _16_ | _1_ |
| --- | --- | --- |
| 1 | 2 | 3 |

 

This is addition of all the individual digits multiplied by their powers: $(256 \times 1) + (16 \times 2) + (1 \times 3) = 256 + 32 + 3 = 291\_{DEC}$.

 

One silly pasttime of Computer Scientists is to write words using the letters that make up hexadecimal. Remember, though the letters A to F are part of our latin alphabet, in hexadecimal they’re numbers. Look back at the table above to remind yourself what each represents.

 

Face Off, a ludicrous facial surgery high-jinks film, is also a hexadecimal number – if we replace the letter ‘O’ with the zero digit.

| _16,777,216_ | _1,048,576_ | _65,536_ | _4,096_ | _256_ | _16_ | _1_ |
| --- | --- | --- | --- | --- | --- | --- |
| F | A | C | E | 0 | F | F |


A calculator is required certainly but the steps to break down the conversion are still the same: $$15 \times 16,777,216 +$$ $$10 \times 1,048,576 +$$ $$12 \times 65,536 +$$ $$14 \times 4,096 +$$ $$0 \times 256 +$$ $$15 \times 16 +$$ $$15 \times 1$$ $$= 262,988,031$$

 

So $FACE0FF\_{HEX} = 262,988,031\_{DEC}$.

 

Now we’re more comfortable with hexadecimal, let’s consider representing a byte i.e. eight binary digits, as a hexadecimal number. $0\_{BIN}$ is similarly $0\_{HEX}$. What about a larger byte value though? $1010 \space 1100\_{BIN}$ is $172\_{DEC}$, but in hexadecimal it’s $AC\_{HEX}$ (incidentally for fans of Aussie rock, $ACDC\_{HEX} = 44,252\_{DEC}$, a good name for a tribute band that hits that crucial classic rock / Computer Science crossover movement). The lack of wastefulness becomes apparent when considering $1111 \space 1111\_{BIN}$ in hexadecimal: $FF\_{HEX}$. Note that the maximum binary value in eight digits is the maximum hexadecimal value in two digits. Adding one to this number pushes the binary form into the next column as does the hexadecimal form: $1 \space 0000 \space 0000\_{BIN} = 100\_{HEX}$, or $256\_{DEC}$. This relationship occurs again and again with these two number systems. It’s for this reason that hexadecimal is often used to neatly capture a binary number in a shorter form that humans are less likely to mistranscribe.

 

Digression over, let’s return to binary number conversion – this time from decimal to binary.

 

Converting the original example $154\_{DEC}$ back to binary is a little more complex but not unreasonably so. We discover the binary version by writing down one digit at a time from right to left. The digit written down is the remainder after dividing by the base. In this example we’re repeatedly dividing by two – if the number is divided by two exactly i.e. it’s an even number, then a $0$ is written, otherwise if the the number is divided by two with a remainder of $1$ i.e. it’s an odd number, then a $1$ is written.

 

154 divided by 2 is 77 with no remainder. A zero is written down. $$0$$ 77 divided by 2 is 38 with remainder one. A one is written to the left. $$10$$ 38 divided by 2 is 19 with no remainder. Another zero is written. $$010$$ 19 divided by 2 is 9 with remainder one. The pattern continues. $$1010$$ 9 divided by 2 is 4 with remainder one. $$1 \space 1010$$ 4 divided by 2 is 2 with no remainder. $$01 \space 1010$$ 2 divided by 2 is 1 with no remainder. $$001 \space 1010$$ And the final number left over is a one, which when divided by two yields zero remainder one. $$1001 \space 1010$$ Arriving at zero is the terminating case for this list of steps. Indeed, $1001 \space 1010\_{BIN}$ is the number we initially converted to $154\_{DEC}$.

 

One last example and we’ll conclude this extremely important topic. Another number system (admittedly used less frequently than binary or hexadecimal) is called Octal (OCT) which only has eight digits. Like binary, it uses the digits from the decimal system but just the first eight: $0, 1, 2, 3, 4, 5, 6$ and $7$. Similar patterns abound: $7\_{OCT} + 1\_{OCT} = 10\_{OCT} = 8\_{DEC}$.

 

Using the same rule for converting decimal numbers to binary, we will now convert $25\_{DEC}$ to octal.

 

$25$ divided by $8$ is $3$ with remainder one. We write down the remainder at the far right. $$1$$ $3$ divided by $8$ is zero (the terminating case) with remainder three. The remainder is written down to the left of the previous digit. $$31$$ And already we’re done. $25\_{DEC} = 31\_{OCT}$. Which explains why Computer Scientists get Christmas and Halloween confused.
