<template>
  <div id="app">
    <div class="card-container">
      <HeroSection />

      <div class="content-wrapper">
        <div class="section-title">Give a Rating</div>

        <ReactionButtons
          :reaction="reaction"
          @set-reaction="setReaction"
        />

        <StatusBox :reaction="reaction" :message="message" />

        <StatsContainer :like-count="likeCount" :dislike-count="dislikeCount" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HeroSection from "./components/HeroSection.vue";
import ReactionButtons from "./components/ReactionButtons.vue";
import StatusBox from "./components/StatusBox.vue";
import StatsContainer from "./components/StatsContainer.vue";

const reaction = ref(null);
const likeCount = ref(0);
const dislikeCount = ref(0);

const message = computed(() => {
  if (reaction.value === "like") {
    return "You like this";
  } else if (reaction.value === "dislike") {
    return "You don't like this";
  }
  return "No reaction";
});


function setReaction(type) {
  if (type === "like") {
    likeCount.value++;
    reaction.value = "like";
  } else if (type === "dislike") {
    dislikeCount.value++;
    reaction.value = "dislike";
  }
}
</script>
