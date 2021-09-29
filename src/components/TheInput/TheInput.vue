<template>
  <input
    type="text"
    class="input"
    :value="modelValue"
    :placeholder="placeholder"
    @input="emitValue('modelValue', $event)"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    modelModifiers: {
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  methods: {
    emitValue(propName, evt) {
      let val = evt.target.value;
      if (this.modelModifiers["no-whitespace"]) {
        val = val.replace(/\s/g, "");
      }
      this.$emit(`update:${propName}`, val);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  padding: 10px 20px;
  border-radius: 40px;
  font-size: $fs-primary - 2px;
  //border: 1px solid;
  width: 100%;
}
::placeholder {
  color: $gray;
}
</style>
