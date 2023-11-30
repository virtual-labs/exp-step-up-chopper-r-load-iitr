
<div style="font-family: 'Nunito Sans', sans-serif; font-size: 20px;text-align: justify;">

### **Introduction**

A step-up chopper, also known as a boost chopper, is a type of DC-DC converter used to increase the output voltage of a DC source. It is commonly employed in various power electronic applications to 
boost the voltage level efficiently and is considered the counterpart of the step-down chopper, which reduces the output voltage.The step-up chopper operates based on the principle of energy storage and transfer. 
It includes a switch (usually a semiconductor device such as a MOSFET or IGBT), an inductor, a diode, and a capacitor.<br>
<center> <img src="images\Fig 1.PNG "height=270px; style="mix-blend-mode: darken; -webkit-filter: contrast(150%);"></center>       
<center><b style="font-size: 19px;">Fig. 1 Circuit diagram of Step-up chopper</b></center>

### **Working Principle of Step-up Chopper**

To understand the working principle, let us first have a look at an equivalent circuit diagram of step-up chopper. This is shown in Fig. 2. Chopper is shown as a switch CH.  During the ON time of the switch, the inductor current increases, and energy is stored in the inductor. When the switch is turned OFF, the inductor releases the stored energy, and the output voltage is boosted through the diode and capacitor.
We will understand the working of this chopper in two steps: Switch ON period and Switch OFF period of chopper.<br><br>
<b>Switch ON Period:</b> When chopper (CH) is switched ON, the current will flow through the closed path formed by supply source V<sub>s</sub>, inductor L and chopper CH. During this period, no current will flow through the load. Only source current i<sub>s</sub> will flow and the value of load current i<sub>o</sub> will be ZERO during the ON period.
This case is depicted in figure below.

<center> <img src="images\Fig 2.PNG "height=270px; style="mix-blend-mode: darken; -webkit-filter: contrast(250%);"></center>
<center><b style="font-size: 19px;">Fig. 2 Equivalent circuit of Step-up Chopper during the T<sub>ON</sub></b></center><br>

During the TON period, energy is stored in the inductor L. This energy storage in L is essential to boost the load output voltage above the source voltage. Therefore, a large value of L is required in a step-up chopper.<br>

<b>Switch OFF period:</b> When the chopper CH is switched OFF, the current through the L can not die instantaneously rather it decays exponentially. Due to this behavior of L, it will force the current through the diode D and load for the entire time period T<sub>OFF</sub>. This is shown in figure below.

<center> <img src="images\Fig 3.PNG "height=270px; style="mix-blend-mode: darken; -webkit-filter: contrast(250%);"></center>
<center><b style="font-size: 19px;">Fig. 3 Equivalent circuit of Step-up Chopper during the T<sub>OFF</sub></b></center><br>

Since, the current through the inductor L tends to decrease, the polarity of the emf induced in inductor L is reversed as shown in above figure. 
As a result, the voltage across the load becomes equal to the sum of source voltage and emf induced in inductor. Thus, the output voltage exceeds the source voltage Vs. The load / output voltage may be written as below.

<center>

$ V_o = V_s + L \frac {di}{dt}....(1)$

</center>

Thus, the circuit works as a step-up chopper. It may be noted here that, the voltage across the load increases because the inductor releases its stored energy to the load during the OFF period.

### **Analysis of Waveform:**

<center> <img src="images\Fig 4.PNG "style="mix-blend-mode: darken; -webkit-filter: grayscale(100%); filter: grayscale(100%);"></center>
<center><b style="font-size: 19px;">Fig. 4 Output waveform of source voltage, source current, load voltage and load current </b></center><br>

The first waveform represents the source voltage which is a DC voltage equal to $V_s$. Therefore, it is shown as a straight line parallel to time axis. Second waveform shows the source current $i_s$ , When chopper (CH) is switched ON, the source current increases from its minimum value $I_1$ to maximum value $I_2$. It may also be noted that, this source current flows through the inductor during ON time. Therefore, it may be said that the current through the inductor L rises from $I_1$ to $I_2$ during ON period. During this time, no current flows through the load as shown in $i_o$ versus time (t) graph.<br>

When chopper is switched OFF, the source current starts decreasing from its peak value $I_2$ to least value $I_1$. Thus, the current through the inductor decreases from $I_2$ to $I_1$ during the OFF period. Since, load only comes into circuit during the OFF period, it may be said that, load current decreases from $I_2$ to $I_1$ during OFF time.

### **Calculation of Output Voltage:**
From the above analysis of source current and load current waveform, it is clear that, the average value of current flowing through load and inductor
are same and equal to ($I_1$+$I_2$)/2. The energy is stored in L during chopper ON time. This stored energy in L during the ON period is equal to the multiplication of voltage across the inductor, average current through it and T<sub>ON</sub> time. The voltage drop across L during ON time equal to the source voltage $V_s$.<br>

Energy stored in the inductor L is given by 

<center>

$= ( Voltage \; across \; L)(Avg. \; current \; through \; L) *T_{ON}$ 

</center>


<center>

$= \frac {V_s(I_1+I_2)}{2} * T_{ON}....(2)$

</center>

When chopper is switched OFF, the energy released by inductor to the load is given by <br>

<center>

$= ( Voltage  \; across \; L)(Avg. \; current \; through \; L) *T_{OFF}$

</center>

<center>

$= (V_o-V_s)  \frac {(I_1+I_2)}{2}*T_{OFF}....(3)$ 
 
</center>

Considering the system to be lossless, these two energies given by equation (2) and (3) will be<br>

<center>

$V_s \frac {(I_1+I_2)}{2}*T_{ON} = (V_o-V_s)\frac {(I_1+I_2)}{2}*T_{OFF}....(4)$ 
 
</center>

<center>

$V_s * T_{ON} = V_o* T_{OFF}-V_s*T_{OFF}$  

</center>

<center>

$V_o* T_{OFF} = V_{s}(T_{ON}-T_{OFF}) = V_{s}*T$

</center>

<center>

$V_o = V_s \frac {T}{T_{OFF}} = V_s*\frac {T}{T-T_{ON}}$

</center>

<center>

$V_o = V_s * \frac {1}{1- \alpha}....(5)$ 
 
</center>
      

### **Advantages of Step-up Chopper**

1. <b>Voltage Boosting:</b> The primary advantage of a step-up chopper is its ability to increase the output voltage from a lower level to a higher level efficiently. This feature makes it valuable in various applications where the input voltage is insufficient for the load requirements.

2. <b>Efficiency:</b> Step-up choppers can achieve high conversion efficiency, especially when operating in Continuous Conduction Mode (CCM). By storing and transferring energy through the inductor, the chopper minimizes energy losses during the conversion process.

3. <b>Regulation and Control:</b> Step-up choppers allow for precise regulation and control of the output voltage. By adjusting the duty cycle of the chopper's switch, the output voltage can be varied as needed to match the load requirements.
          

### **Disadvantages of Step-up Chopper**
1. <b>Higher Component Stress:</b> In step-up choppers, the components, especially the switch and diode, experience higher voltage and current stresses compared to step-down choppers. This increased stress may require the use of components with higher voltage and current ratings, which can impact cost and design complexity.

2. <b>Complexity:</b> The control and regulation of step-up choppers can be more complex compared to step-down choppers. Achieving smooth regulation and reliable operation in both Continuous Conduction Mode (CCM) and Discontinuous Conduction Mode (DCM) may require sophisticated control strategies.

3. <b>Electromagnetic Interference (EMI):</b> Step-up choppers can produce higher levels of electromagnetic interference due to the faster switching of the components and the higher voltage stress. Proper filtering and shielding measures may be necessary to mitigate EMI effects and ensure compliance with electromagnetic compatibility (EMC) standards.
              
### **Applications of Step-up Chopper**         

1. <b>DC-DC Voltage Boosting:</b> It is used to increase the voltage level of DC power sources, such as batteries, to match the required voltage for specific loads or systems.

2. <b>Photovoltaic (PV) Systems:</b> In solar energy systems, step-up choppers are used to boost the output voltage from the PV panels to the required level for grid-tie inverters or battery charging.
              
3. <b>Power Supplies:</b> Step-up choppers are used in power supply circuits to provide higher output voltages for specific electronic devices or systems.
              
4. <b>Electric Vehicle (EV) Charging:</b> In EV charging stations, step-up choppers are employed to increase the voltage from the AC grid to the required charging voltage for the EV battery.                          

</div>