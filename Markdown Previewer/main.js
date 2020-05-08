let defaultText = `# Heading 1
## Heading 2
-------------

[My GitHub profile](https://github.com/skanda1395)

I am a \`<p\>\` element and I have \`\<inline-code\>\` within me.

### Codeblocks:
 
#### Javascript

\`\`\`
function confirmEnding(str, target) {
  return new RegExp("" + target + "$").test(str);
}
confirmEnding("Bastian", "n");
\`\`\`

#### HTML

\`\`\`
<nav id="nav-bar">
 <a class="nav-link" href="#how_it_works">Concept</a>
 <a class="nav-link" href="#products_section">Products</a>
 <a class="nav-link" href="#contact_section">Contact</a>
</nav>
\`\`\`

### Ordered List:

1. Item #1
2. Item #2
3. Item #3

### Blockquote:

> This is \`\<blockquote\>\`.
> You can quote shit from anywhere. 
> You should also cite the source!

### Image:

![alt text](https://vuejs.org/images/logo.png 'Vue Logo')

Be **bold** when you take risks because that's how you overcome your _uncomfortable_ situations.`;

let app = new Vue({
  el: "#app",
  data: {
    userData: "",
  },
  computed: {
    updatePreview() {
      return marked(this.userData, {
        pedantic: false,
        gfm: true,
        breaks: true,
        smartLists: true,
        xhtml: false,
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      });
    },
  },
  mounted: function () {
    this.userData = defaultText;
  },
});
