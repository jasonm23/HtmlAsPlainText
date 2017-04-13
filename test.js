import htmlAsPlainText from './index');

describe('HtmlAsPlainText', () => {

  it('strips html tags', () => {
    let expected = 'HELLO world';
    let observed = h2p('<b>HELLO <blink>world</blink></b>');

    expect(expected).toEqual(observed);
  });

  it('treats whitespace like a browser - trim', () => {
    let expected = 'Hey there, Ted';
    let observed = h2p('<b>Hey there, Ted</b>  \n');

    expect(expected).toEqual(observed);
  });

  it('parses ordered lists into enumerated lines', () => {
    let expected = '1. First there is this\n2. Then there is that';
    let observed = h2p('<ol><li>First there is this</li><li>Then there is that</li></ol>');

    expect(expected).toEqual(observed);
  });

  it('parses unordered lists into ticked lines', () => {
    let expected = '- First there is this\n- Then there is that';
    let observed = h2p('<ul><li>First there is this</li><li>Then there is that</li></ul>');

    expect(expected).toEqual(observed);
  });

  it('treats whitespace like a browser - collapse repeated space', () => {
    let expected = 'It is aa maaaa zzzzz ing!';
    let observed = h2p('<h1>It is  aa maaaa   zzzzz       ing!</h1>');

    expect(expected).toEqual(observed);
  });

  it('strips html whitespace entities', () => {
    let expected = 'hi';
    let observed = h2p('hi&nbsp;');

    expect(expected).toEqual(observed);
  });

  it('decodes all kinds of HTML entities', () => {
    let expected = 'Foo \xA9 bar \uD834\uDF06 baz \u2603 qux \u2A11';
    let observed = h2p('Foo &copy; bar &#x1D306; baz &#9731; qux &awint;');

    expect(expected).toEqual(observed);
  });

  it('ignores linebreaks', () => {
    let expected = 'hi Ted';
    let observed = h2p('hi\n\n\n\n<b>Ted</b>\n');

    expect(expected).toEqual(observed);
  });

  it('ignores single linebreaks', () => {
    let expected = 'hi Ted';
    let observed = h2p('hi\nTed');

    expect(expected).toEqual(observed);
  });

  it('inserts 2 linebreaks after </p>', () => {
    let expected = 'it was the best of times\n\nit was the worst of times';
    let observed = h2p('<p>it was the best of times</p><p>it was the worst of times</p>');

    expect(expected).toEqual(observed);
  });

  it('inserts 1 linebreak <br>', () => {
    let expected = 'hello\ngoodbye';
    let observed = h2p('hello<br/>goodbye');

    expect(expected).toEqual(observed);
  });

  it('decodes html entities', () => {
    let expected = '<3 & </3';
    let observed = h2p('&lt;3 &amp; &lt;/3');
  });

  it('calls toString on input', () => {
    let expected = '8675309';
    let observed = h2p(8675309);

    expect(expected).toEqual(observed);
  });

  it('is safe on null input', () => {
    let expected = '';
    let observed = h2p(null);

    expect(expected).toEqual(observed);
  });

  it('is safe on undefined input', () => {
    let expected = '';
    let observed = h2p(undefined);

    expect(expected).toEqual(observed);
  });
});
