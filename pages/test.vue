<template>
  <client-only>
    <div class="editor">
      <editor
        ref="tuiEditor"
        v-model="editorText"
        :options="editorOptions"
        :html="editorHtml"
        previewStyle="vertical"
        height="500px"
        mode="wysiwyg"
      />
    </div>
  </client-only>
</template>
 
<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
var Editor = null;
if (process.client) {
  var toastui = require("@toast-ui/vue-editor");
  Editor = toastui.Editor;
}

export default {
  components: {
    Editor
  },
  data() {
    return {
      editorText: "This is initialValue.",
      editorOptions: {
        hideModeSwitch: true,
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "divider",
          "indent",
          "outdent"
        ]
      },
      editorHtml: ""
    };
  },
  methods: {
    scroll() {
      this.$refs.tuiEditor.invoke("scrollTop", 10);
    },
    moveTop() {
      this.$refs.tuiEditor.invoke("moveCursorToStart");
    }
  }
};
</script>
<style lang="css">
</style>