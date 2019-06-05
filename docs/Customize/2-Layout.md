### Custom Layouts

A Layout-Component must provide named slots for each input. The Slotname must be in the following format: `input-${input-index}` where `${input-index}` is replaced with the index of each input. Example: `<slot name="input-1" />`