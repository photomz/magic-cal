<template>
  <span jsslot="" jsname="j7LFlb" tabindex="-1" class="z80M1 QJXRJc"
  jsaction="click:o6ZaF(preventDefault=true); mousedown:lAhnzb; mouseup:Osgxgf; mouseenter:SKyDAe; mouseleave:xq3APb;touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)"
    aria-label="Describe with AI 🦄" role="menuitem">
    <div class="aBBjbd MbhUzd" jsname="ksKsZd"></div>
    <div class="uyYuVb oJeWuf" data-key="event" jsaction="JIbuQc:Dc9sZe" @click="submit">
      <div class="jO7h3c">✨ AI Event</div>
    </div>
  </span>
  <!-- <div
    role="button"
    aria-label="AI Magic"
    tabindex="1"
    aria-haspopup="true"
    aria-disabled="false"
    id="magic-button"
    @click="modal = true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
      fill="#EA4335"
    >
      <path
        d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"
      />
    </svg>
  </div> -->
  <div v-if="modal" v-on-click-outside="() => (modal = false)" @keydown.esc="modal = false" class="popup">
    <input type="text" v-model="inputValue" v-focus @keyup.enter="submit" placeholder="Ex: Lunch with Ben at 2pm"
      class="input-field" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts"">
import { ref } from "vue";
import dateFormat from "dateformat";
import { vOnClickOutside } from "@vueuse/components";

const modal = ref(false);
const inputValue = ref("");

// enables v-focus in templates
const vFocus = {
  mounted: (el) => el.focus(),
};

const submit = async () => {
  const input = prompt("Ex: Lunch with Ben at 2pm");

  const now = dateFormat(new Date(), "d mmm yyyy, h:MMTT");

  const BASE_URL =
    "https://calendar-link-server.onrender.com/api/generate-link";
  try {
    const url = `${BASE_URL}?prompt=${encodeURIComponent(input)}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("Response JSON:", data);
    window.location.href = data.google_calendar_link;
  } catch (error) {
    console.error("Error submitting input to API:", error);
  }
  modal.value = false;
};
</script>

<style>
#magic-button {
  border-radius: 999px;
  background-color: white;
  padding: 6px 8px;
  margin-left: 12px;
  box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3);
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.input-field {
  margin-bottom: 10px;
}
</style>
