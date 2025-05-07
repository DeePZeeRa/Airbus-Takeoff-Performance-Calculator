export const aircraftTypes = [
  {
    id: 'A318',
    name: 'A318-100',
    variants: [
      {
        id: 'CFM56',
        name: 'CFM56',
        engines: [
          { id: 'cfm56-5b8', name: 'CFM56-5B8/P', thrust: 21500 }
        ]
      }
    ]
  },
  {
    id: 'A319ceo',
    name: 'A319-100 CEO',
    variants: [
      {
        id: 'CFM56',
        name: 'Standard',
        engines: [
          { id: 'cfm56-5b6', name: 'CFM56-5B6/P', thrust: 23300 }
        ]
      },
      {
        id: 'IAEv2522',
        name: 'IAE-v2522',
        engines: [
          { id: 'iae-v2522', name: 'IAE V2522-A5', thrust: 22000 }
        ]
      }
    ]
  },
  {
    id: 'A319neo',
    name: 'A319 NEO',
    variants: [
      {
        id: 'LEAP1A24',
        name: 'LEAP-1A24',
        engines: [
          { id: 'leap-1a24', name: 'LEAP-1A24', thrust: 24000 },
        ]
      },
      {
        id: 'PW1124G',
        name: 'PW1124G-JM',
        engines: [
          { id: 'pw1124g', name: 'PW1124G-JM', thrust: 24000 }
        ]
      }
    ]
  },
  {
    id: 'A320ceo',
    name: 'A320-200 CEO',
    variants: [
      {
        id: 'CFM56',
        name: 'CFM56-5B4/P',
        engines: [
          { id: 'cfm56-5b4', name: 'CFM56-5B4/P', thrust: 27000 },
        ]
      },
      {
        id: 'IAEv2527',
        name: 'IAE V2527-A5',
        engines: [
          { id: 'iae-v2527', name: 'IAE V2527-A5', thrust: 26500 }
        ]
      },
      {
        id: 'CFM56-sharklet',
        name: 'CFM56-5B4/P Sharklet',
        engines: [
          { id: 'cfm56-5b4', name: 'CFM56-5B4/P', thrust: 27000 },
        ]
      },
      {
        id: 'IAEv2527-sharklet',
        name: 'IAE V2527-A5 Sharklet',
        engines: [
          { id: 'iae-v2527', name: 'IAE V2527-A5', thrust: 26500 }
        ]
      }
    ]
  },
  {
    id: 'A320neo',
    name: 'A320 NEO',
    variants: [
      {
        id: 'default',
        name: 'Default',
        engines: [
          { id: 'leap-1a26', name: 'LEAP-1A26', thrust: 26000 },
          { id: 'pw1127g', name: 'PW1127G-JM', thrust: 27000 }
        ]
      }
    ]
  },
  {
    id: 'A321neo',
    name: 'A321 NEO',
    variants: [
      {
        id: 'default',
        name: 'Default',
        engines: [
          { id: 'leap-1a32', name: 'LEAP-1A32', thrust: 32000 },
          { id: 'pw1133g', name: 'PW1133G-JM', thrust: 33000 }
        ]
      },
      {
        id: 'lr',
        name: 'A321XLR',
        engines: [
          { id: 'leap-1a32', name: 'LEAP-1A32', thrust: 32000 },
          { id: 'pw1133g', name: 'PW1133G-JM', thrust: 33000 }
        ]
      }
    ]
  },
  {
    id: 'A340',
    name: 'A340',
    variants: [
      {
        id: 'a340-200',
        name: 'A340-200',
        engines: [
          { id: 'cfm56-5c2', name: 'CFM56-5C2', thrust: 34000 }
        ]
      },
      {
        id: 'a340-300',
        name: 'A340-300',
        engines: [
          { id: 'cfm56-5c4', name: 'CFM56-5C4', thrust: 34000 }
        ]
      },
      {
        id: 'a340-500',
        name: 'A340-500',
        engines: [
          { id: 'rr-trent-553', name: 'Rolls-Royce Trent 553', thrust: 53000 }
        ]
      },
      {
        id: 'a340-600',
        name: 'A340-600',
        engines: [
          { id: 'rr-trent-556', name: 'Rolls-Royce Trent 556', thrust: 56000 }
        ]
      }
    ]
  },
  {
    id: 'A350',
    name: 'A350 XWB',
    variants: [
      {
        id: 'a350-900',
        name: 'A350-900',
        engines: [
          { id: 'rr-trent-xwb-84', name: 'Rolls-Royce Trent XWB-84', thrust: 84000 }
        ]
      },
      {
        id: 'a350-1000',
        name: 'A350-1000',
        engines: [
          { id: 'rr-trent-xwb-97', name: 'Rolls-Royce Trent XWB-97', thrust: 97000 }
        ]
      }
    ]
  },
  {
    id: 'A380',
    name: 'A380-800',
    variants: [
      {
        id: 'trent900',
        name: 'Trent 900 Variant',
        engines: [
          { id: 'rr-trent-970', name: 'Rolls-Royce Trent 970', thrust: 70000 }
        ]
      },
      {
        id: 'gp7200',
        name: 'GP7200 Variant',
        engines: [
          { id: 'ea-gp7270', name: 'Engine Alliance GP7270', thrust: 70000 }
        ]
      }
    ]
  }
];


export const flapSettings = ['1', '2', '3', 'FULL'];
export const thrustSettings = ['TOGA', 'FLEX'];
export const bleedSettings = ['Auto', 'On', 'Off'];
export const antiIceSettings = ['Auto', 'On', 'Off'];
export const surfaceConditions = ['Dry', 'Wet', 'Contaminated'];

// Helper function to find engine by aircraft type and engine type
export const findEngine = (aircraftTypeId, variantId, engineId) => {
  const aircraft = aircraftTypes.find(a => a.id === aircraftTypeId);
  if (!aircraft) return null;
  
  const variant = aircraft.variants.find(v => v.id === variantId);
  if (!variant) return null;
  
  return variant.engines.find(e => e.id === engineId) || null;
};