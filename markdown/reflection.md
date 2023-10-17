Here I will reflect on the book CC chapters 2-11. I will be providing screenshots on how I changed my code from L2/L3 according to the book. 10 screenshots. 10 reflections with 4-6 sentences each.
# Reflections Clean Code

## Chapter 2 - Meaningful Names

Throughout L2 and L3 I have tried to name my variables and methods as explicitly as possible. The names of the variables explain not only what they are conceptually, but also as primitive value, if this is needed (if the method is a helper method - Figure 1). The method names summarize what the method does and I tried to pick one word per concept. In the case of methods returing booleans, these start with "is" and when colors are returned, the method starts with "generate" (Figure 2). In order to get the luminance and contrast ratio, I used formulas so these methods start instead with "calculate". I tried to be mindful of what someone working in the industry might use as terminology this is why I used terms as "monochromatic", "analogous", "WCGAA" and "WCAGAAA" in my public interface in L2.

![Figure 1](img/1.png) <br>
_Figure 1_

![Figure 2](img/2.png) <br>
_Figure 2_

## Chapter 3 - Functions

I shorteded my functions and tried not to repeat myself, but I did not follow the rules of Clean Code strictly all the time. Figure 3 and 4 represent before and after in L3, where I had the methods do one thing and keep one level of indentation. In my opinion it is more readable, but it would not be something I write to begin with because I am not used to this way of structuring my thoughts. When I think of a next step, I do not think of a new method, but rather a new line of code. The way that is suggested by CC (Figure 4) implies more lines of code, but less comments because the method names are more explicit. This could be a suitable trade-off assuming the programmer is used to this way of thinking. I also had to make some compromise and parameterize the method isTileColorCorrect (Figure 4) in order not to have several levels of indentation and logic nested in the same method. So I think the book contradicts itself and in the real world, it is not always possible to have perfectly "clean" code.

![Figure 3 - Before](img/3.png) <br>
_Figure 3 - Before_

![Figure 4 - After](img/4.png) <br>
_Figure 4 - After_

## Chapter 4 - Comments

After the experiment in Figure 3 and 4 I am coming to the realization that writing self explanatory code does not require the use of comments. Usually when I do a revision to my project I tend to skip updating the comments, but rather use the comments to understand my old code, which according to CC shouldn't be necessary if you write clear code. Some of my comments were redundant and could be removed by splitting the code into several methods that have intention reavealing names. Other comments explained the intention behind a behaviour (like in the case of using formulas for calculating luminance or color theory - Figure 5 and Figure 6). <br>
Figure 7 shows an unnecessary comment that I removed, and instead used a variable name that was more explicit (Figure 8). The variable also stays close to where it is used, so it is easier to understand the context. <br>
Other things I will consider in the future would be to not add reduntant comments, that restate the obvious (method name in sentence form), although these have been indoctrinated in myself by the courses so far. In my opinion either all methods have a comment or none of them do. To do comments are still useful, and mark what needs to be done in the future, what does not work yet, or what is a temporary solution. It's easy to search through the project for them, in the case of a hiatus from the project. I tend to write longer comments at first, to give myself pointers or even paste the problem inside my project with comments. But after that I try to shorten them and make them more concise, so that they can be a helper to both myself and others who might read my code.

![Figure 5](img/5.png) <br>
_Figure 5_

![Figure 6](img/6.png) <br>
_Figure 6_

![Figure 7](img/7.png) <br>
_Figure 7_

![Figure 8](img/8.png) <br>
_Figure 8_

## Chapter 5 - Formatting

In L2 and L3 I have the most important concepts at the top and least important at the bottom, with helper methods underneath the methods that call them (Figure 9).
Empty lines separate concepts that are not related if the method does more than one thing.

Instance variables, that are used by many methods in the class, are at the top of the class. Otherwise if they are only used inside one method they are declared inside that method so that they are relevant to the context they are being used in (Figure 10).

Inside my projects, lines are no longer than 80 characters (due to prettier) and there are usually around 200 lines in one file, to keep the code readable and maintainable.

Formating is done the same style using prettier. In both L2 and L3, the same line length, same indentation and same spacing is used throughout the project.

![Figure 9](img/9.png) <br>
_Figure 9_

![Figure 10](img/10.png) <br>
_Figure 10_