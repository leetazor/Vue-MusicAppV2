export default {
  // we are running beforeMount hook to add an icon before the element is inserted into the document
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`;

    // only one argument is supported at any time
    if (binding.arg === "full") {
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      iconClass += " float-right";
    }

    if (binding.modifiers.green) {
      iconClass += " text-green-400";
    } else if (binding.modifiers.yellow) {
      iconClass += " text-amber-300";
    } else {
      iconClass += " text-zinc-400";
    }

    el.innerHTML += `<i class="${iconClass}" ></i>`;
  },
};
