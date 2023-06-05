# Chaotic Musical Set Theory

The start of an application for making music by combining music theory and chaos theory.

The app is slowly developing. Right now it features a windowing system that allows you to drag and resize windows around and track them via an appbar at the bottom of the screen. Windows can be minimized to the appbar. I still need to add in a new window button for both but that will be quick.

Pitch sets are defined in the traditional musical set theory sense, being constructed of the 12 pitch classes. This allows for representation of all scales and other groups of notes if desired, while also allowing the user to limit focus in on specific triads if desired. I will be including some additions the pitch set menu shortly which will allow to extend a pitch set from its root pitch class in such a way as to follow a selected musical scale, for example if you have one pitch class of 0 (C) then you'll be able to extend that pitch set to 7 members by selecting a scale such as "Harmonic Minor" to end with a pitch set that represents the scale C Harmonic Minor which can then be rendered on a fretboard with desired tuning. I will be adding new fretboard types as well as the app continues to mature, right now the app is meant for a multiscale 8 string guitar.

The utils folder contains a weird numerical integrator I coded naively after staring at the Butcher tableau for the Dormand-Prince 5/4 method and reading the wikipedia page until it made sense lol. The numerical integrator is going to play a crucial role in the app, though right now it's not used anywhere.

If anyone finds this and is interested in the guitar fretboard stuff, I made that by tracing over a Kiesel 8-string multiscale guitar. I'll be adding 6, 7, and 8 string guitars with non-multiscale and multiscale options as the app matures which will allow for dynamically generated diagrams using scales or user defined pitch sets.

![image](https://github.com/carperbr/chaos-music-app/assets/30326384/4071dc48-a652-494f-97da-dfb769c991de)
