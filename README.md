# WQoE-Emulator
An emulator for the Web Quality-of-Experience measurement

## Introduction
WQoE-Emulator is a part of an implementation of aSTEAM Project (Next-Generation Information Computing Development Program through the National Research Foundation of Korea (NRF) funded by the Ministry of Science and ICT; https://asteam.korea.ac.kr)'s interface virtualization based crowdsensing system for experimental large-scale user experience evaluation and middlebox based user experience measurement technology. WQoE-Emulator is developed as a JavaScript library, so users can inject this script to any web pages. This emulator controls when a specific area of a web page is loaded. This emulator makes it easy to see how the load time affect the user experience.

## Requirements
* None. This library can work on almost all web pages.

## Instructions

### init
```
emulator.init();
```
Set a web page to an init state; all the area is going to be hidden.

### doEmulation
```
let settings = { // Note that the unit is seconds.
  layout: 1,
  head: 3,
  text: 4,
  image: 5,
  ad: 10,
  btf: 10
}
emulator.doEmulation(settings);
```
Start an emulation. Timing information should be given like the above example.

### getResults
```
let result = emulator.getResults();
```
After the emulation finishes, you can get the real loaded time of each area through this function.

