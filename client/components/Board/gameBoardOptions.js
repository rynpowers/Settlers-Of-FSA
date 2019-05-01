const x = 8;

export default {
  row1: [
    { style: { transform: `translateX(${x}%)`, zIndex: 1 }, id: 1 },
    { style: { transform: 'translateX(0%)' }, id: 2 },
    { style: { transform: `translateX(-${x}%)`, zIndex: 1 }, id: 3 },
  ],
  row2: [
    { style: { transform: `translateX(${x * 1.5}%)` }, id: 4 },
    { style: { transform: `translateX(${x * 0.5}%)` }, id: 5 },
    { style: { transform: `translateX(-${x * 0.5}%)` }, id: 6 },
    { style: { transform: `translateX(-${x * 1.5}%)` }, id: 7 },
  ],
  row3: [
    { style: { transform: `translateX(${x * 2}%)`, zIndex: 1 }, id: 8 },
    { style: { transform: `translateX(${x * 1}%)` }, id: 9 },
    { style: { transform: 'translateX(0%)', zIndex: 1 }, id: 10 },
    { style: { transform: `translateX(-${x * 1}%)` }, id: 11 },
    { style: { transform: `translateX(-${x * 2}%)`, zIndex: 1 }, id: 12 },
  ],
  row4: [
    { style: { transform: `translateX(${x * 1.5}%)` }, id: 13 },
    { style: { transform: `translateX(${x * 0.5}%)` }, id: 14 },
    { style: { transform: `translateX(-${x * 0.5}%)` }, id: 15 },
    { style: { transform: `translateX(-${x * 1.5}%)` }, id: 16 },
  ],
  row5: [
    { style: { transform: `translateX(${x}%)`, zIndex: 1 }, id: 17 },
    { style: { transform: 'translateX(0%)' }, id: 18 },
    { style: { transform: `translateX(-${x}%)`, zIndex: 1 }, id: 19 },
  ],
};
