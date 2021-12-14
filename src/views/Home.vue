<template>
  <div>
    <div
      class="hero"
      :style="`background-image: linear-gradient(to bottom left, rgb(0 0 0 / 0%), #00000062), url('${require('@/assets/img/federico-beccari-ahi73ZN5P0Y-unsplash.jpg')}');`"
    >
      <b-container class="text-center">
        <div class="hero__body">
          <h1 class="text-dark">Energy <i class="fas fa-bolt text-warning"></i> Watch</h1>
          <p class="text-light">
            We are watching it for you!
          </p>
          <b-button
            v-b-modal.register-modal
            variant="primary"
          >
            REGISTER NOW
          </b-button>
        </div>

      </b-container>
    </div>

    <b-container class="my-5">
      <b-row align-v="center">
        <b-col>
          <b-img
            class="rounded shadow"
            fluid
            :src="require('@/assets/img/anastasia-zhenina-E4XARZNDjzI-unsplash.jpg')"
          ></b-img>
        </b-col>
        <b-col>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat repellendus doloribus, commodi quidem vero reprehenderit asperiores voluptatum fuga maiores nostrum consequatur eos vel aspernatur ratione sed explicabo. Necessitatibus, eveniet excepturi.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A assumenda nesciunt ut dicta facere tempore architecto? Porro quidem totam, repudiandae repellendus culpa laborum explicabo illum consectetur, beatae amet sint libero.</p>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
