const LOREM_PARAGRAPHS: string[][] = [
  [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Donec scelerisque ipsum viverra, blandit dui vitae, feugiat ex.',
    'Donec varius ex consectetur, pellentesque elit quis, rutrum elit.',
    'Quisque ipsum mi, auctor sed ultricies ut, commodo vitae massa.',
    'Sed ut quam vulputate, aliquam velit ut, sagittis libero.',
    'Phasellus semper maximus arcu, faucibus rhoncus nibh rutrum quis.',
    'Sed euismod ut dui vel luctus.',
    'Vivamus mi est, pretium iaculis velit porttitor, condimentum maximus nisi.',
    'Phasellus accumsan nunc eleifend metus aliquet, nec bibendum erat mattis.',
    'Suspendisse pharetra ex at augue mattis vulputate.',
    'Ut lobortis odio sit amet nisi commodo, tempus tristique felis vulputate.',
    'Cras id tincidunt elit, quis sodales risus.',
    'Nulla facilisi.',
    'Nunc bibendum orci eget arcu dapibus, eget porttitor nibh varius.',
    'Praesent nulla lorem, vulputate eu fringilla vel, dapibus eget metus.',
    'Proin eget auctor quam, quis dapibus nibh.',
  ],
  [
    'Nam tempor ligula eu sodales molestie.',
    'Vestibulum sed risus id lacus vestibulum gravida.',
    'Maecenas condimentum ex ac arcu maximus, eu molestie quam vehicula.',
    'Suspendisse sit amet elit vitae nulla bibendum suscipit.',
    'Cras ultricies dignissim semper.',
    'Etiam nec condimentum magna, vel luctus ex.',
    'Pellentesque sodales vehicula purus id consectetur.',
  ],
  [
    'Vestibulum euismod sit amet odio eu rhoncus.',
    'Nulla a neque vitae lacus viverra luctus.',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    'Aliquam non dolor dui.',
    'Pellentesque fringilla ipsum lorem, eu bibendum sem lacinia sed.',
    'Nam sed est pellentesque, posuere turpis sed, volutpat justo.',
    'Vestibulum auctor maximus vestibulum.',
    'Maecenas ut mattis augue, ut porta tellus.',
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    'Mauris imperdiet eros in sapien molestie, ac euismod urna faucibus.',
    'Cras eget mauris id nunc luctus ullamcorper.',
    'Donec scelerisque cursus scelerisque.',
    'Nam placerat mauris eget diam sollicitudin, sed fermentum nibh convallis.',
    'Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  ],
  [
    'Vivamus posuere mattis justo, ac fermentum libero porta vitae.',
    'Nunc rhoncus velit est, a facilisis augue viverra et.',
    'Sed dapibus a erat sit amet porttitor.',
    'Nulla gravida facilisis pretium.',
    'Pellentesque odio ante, ultrices sed mattis vitae, facilisis id nisl.',
    'Vivamus gravida justo vitae ex commodo dapibus.',
    'Aliquam dignissim sit amet ligula sed lobortis.',
    'Suspendisse id purus tempor, consectetur lacus ut, fermentum est.',
    'Aliquam gravida rutrum dolor sed cursus.',
    'Curabitur sagittis diam purus, ac fermentum lorem malesuada eu.',
    'Mauris venenatis sollicitudin lobortis.',
    'Duis tortor elit, semper ut suscipit ac, consectetur at turpis.',
    'Phasellus augue lorem, viverra eget vehicula nec, commodo in felis.',
    'Maecenas est massa, accumsan suscipit risus vel, varius sodales est.',
    'Integer vitae purus ex.',
    'Aliquam a erat id erat volutpat gravida eget quis felis.',
  ],
  [
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    'Praesent vitae tincidunt justo.',
    'Vestibulum eu rhoncus ex.',
    'Vivamus aliquet tellus non lorem mattis sollicitudin.',
    'Quisque porttitor, lectus nec bibendum elementum, diam libero porta diam, eget tincidunt dolor lorem vel libero.',
    'Integer velit justo, volutpat non sapien nec, pulvinar rutrum mauris.',
    'Donec quam neque, pharetra ut dolor et, hendrerit lobortis nunc.',
    'Nunc eleifend nisl ut augue dignissim sollicitudin.',
    'Nam pharetra mauris mauris, at malesuada urna congue sit amet.',
  ],
];

export function loremIpsum(sentences?: number) {
  const all: string[][] = [];
  let count = 0;
  let end = false;
  for (let i = 0; i < LOREM_PARAGRAPHS.length; i++) {
    const paragraph = LOREM_PARAGRAPHS[i];
    const arr: string[] = [];
    for (let j = 0; j < paragraph.length; j++) {
      arr.push(paragraph[j]);
      if (sentences && ++count >= sentences) {
        end = true;
        break;
      }
    }
    all.push(arr);
    if (end) {
      break;
    }
  }

  const output = all.map((paragraph) => paragraph.join(' ')).join(' ');

  return output;
}
