export default {
  mounted(el) {
    el.style.color = `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
  },
};
