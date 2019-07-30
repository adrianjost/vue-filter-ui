# Predefined Layouts

[[toc]]

## default

The default layout has unlimited slots and all slots are wrapped in a div with full width.

<LayoutDefault>
<InputToggle slot="input-1"/>
<InputTriSwitch slot="input-2"/>
<InputToggle slot="input-3"/>
</LayoutDefault>

## sort

The sort layout has slots for two inputs. The first input gets `flex:1` applied and therefore gets the maximum available width. input-2 is pushed to the most right.

<LayoutSort>
<InputToggle slot="input-1"/>
<InputToggle slot="input-2"/>
</LayoutSort>
