The concentration of electrons in the conduction band on the n-side is:

n_n = N_c \exp\left(-\frac{E_c-E_{Fn}}{kT}\right)

where

* (N_c) = effective density of states in conduction band
* (E_c) = conduction band energy
* (E_{Fn}) = Fermi level in n-region
* (k) = Boltzmann constant
* (T) = absolute temperature

# Carrier Concentration in p-region

Similarly, the concentration of electrons on the p-side is:

n_p = N_c \exp\left(-\frac{E_c-E_{Fp}}{kT}\right)

# Relation Between Fermi Levels

At thermal equilibrium, the difference in Fermi levels across the junction is related to the barrier potential (V_0):

E_{Fn}-E_{Fp}=eV_0

where (e) is the electronic charge.

# Dividing the Two Carrier Concentration Equations

\frac{n_n}{n_p}=\exp\left(\frac{E_{Fn}-E_{Fp}}{kT}\right)

Substituting (E_{Fn}-E_{Fp}=eV_0):

\frac{n_n}{n_p}=\exp\left(\frac{eV_0}{kT}\right)

# Taking Natural Logarithm

\ln\left(\frac{n_n}{n_p}\right)=\frac{eV_0}{kT}

V_0=\frac{kT}{e}\ln\left(\frac{n_n}{n_p}\right)

# Using Doping Concentrations

At room temperature, all impurities are ionized:

n_n=N_D

p_p=N_A

Using mass action law:

n_p p_p=n_i^2

n_p=\frac{n_i^2}{p_p}=\frac{n_i^2}{N_A}

# Substituting in Barrier Potential Expression

V_0=\frac{kT}{e}\ln\left(\frac{N_D}{n_i^2/N_A}\right)

V_0=\frac{kT}{e}\ln\left(\frac{N_DN_A}{n_i^2}\right)

# Final Expression

Since

\frac{kT}{e}=V_T

(Thermal Voltage)

Therefore,

V_0=V_T\ln\left(\frac{N_AN_D}{n_i^2}\right)

# Where:

* (V_0) = Barrier (Built-in) Potential
* (V_T = \dfrac{kT}{e}) = Thermal voltage
* (N_D) = Donor concentration
* (N_A) = Acceptor concentration
* (n_i) = Intrinsic carrier concentration
