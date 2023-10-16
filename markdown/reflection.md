Here I will reflect on the book CC chapters 2-11. I will be providing screenshots on how I changed my code from L2/L3 according to the book. 10 screenshots. 10 reflections with 4-6 sentences each.
# Reflections Clean Code

## Chapter 2 - Meaningful Names

Throughout L2 and L3 I have tried to name my variables and methods as explicitly as possible. The names of the variables explain not only what they are conceptually, but also as primitive value, if this is needed (if the method is a helper method - Figure 1). The method names summarize what the method does and I tried to pick one word per concept. In the case of methods returing booleans, these start with "is" and when colors are returned, the method starts with "generate" (Figure 2). In order to get the luminance and contrast ratio, I used formulas so these methods start instead with "calculate". I tried to be mindful of what someone working in the industry might use as terminology this is why I used terms as "monochromatic", "analogous", "WCGAA" and "WCAGAAA" in my public interface in L2.

![Figure 1](img/1.png) <br>
_Figure 1_

![Figure 2](img/2.png) <br>
_Figure 2_

## Chapter 3 - Functions

I shorteded my functions and tried not to repeat myself, but I did not follow the rules of Clean Code strictly all the time. Figure 3 and 4 represent before and after in L3, where I had the methods do one thing and keep one level of indentation. 

![Figure 3 - Before](img/3.png) <br>
_Figure 3 - Before_

![Figure 4 - After](img/4.png) <br>
_Figure 4 - After_