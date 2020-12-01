<template>
<div>
  <div class="page">
    <div class="heading-container">
      <div class="heading-info">
        <h2>About Scripture Search</h2>
        <p>Scripture Search is a graphic tool that can be used to understand
          words in the standard works of the Church of Jesus Christ of Latter
          Day Saints in a new way.</p>
        <p>Words can be analyzed in groups based on the work that they appear
          in as well as across different works. Realtions between words can
          also be visualized.</p>
        <p>The works that can be analyzed includin the Old Testament, the
          New Testament, the Book of Mormon, the Doctrine and Covenants and
          The Pearl of Great Price.</p>
      </div>
      <div class="heading-graphics">
        <img class="heading-image" src="/images/title_logo.png">
        <div class="nav-buttons-container">
          <router-link class="nav-button" to="/standard-works">Standard Works</router-link>
          <router-link class="nav-button" to="/word-relations">Word Relations</router-link>
          <router-link class="nav-button" to="/gallery">Graph Gallery</router-link>
        </div>
      </div>
    </div>
    <div class="graph-preview-container">
      <h1 style="margin: 0px auto;">Sample Graphs</h1>
      <div class="graph-item">
        <img src="/images/sw.JPG">
      </div>
      <div class="graph-item">
        <img src="/images/wr.JPG">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.heading-container {
  display: flex;
}

.heading-info {
  margin-top: 50px;
}

.heading-graphics {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-buttons-container {
  display: flex;
  margin-top: 25px;
}

.nav-button {
  background-color: #72A7A0;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.nav-button:hover {
  text-decoration: none;
  color: white;
  background-color: #699992;
}

.graph-preview-container {
  display: flex;
}

.graph-item {
  display: flex;
  flex-direction: column;
}

.graph-item img {
  width: 1000px;
  height: auto;
}

/*Mobile styles*/
@media only screen and (max-width: 500px) {

  .heading-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .heading-info {
    justify-content: center;
    width: 90%;
  }

  .heading-image {
    width: 100%;
  }

  .nav-buttons-container {
    flex-direction: column;
    width: 90%;
  }

  .nav-button {
    margin-bottom: 5px;
  }

  .graph-preview-container {
    flex-direction: column;
    align-items: center;
  }

  .graph-item {
    width: 90%;
    margin-bottom: 20px;
  }

  .graph-item img {
    width: 350px;
    height: auto;
  }
}
/*Desktop styles*/
@media only screen and (min-width: 501px) {
  .heading-container {
    justify-content: space-between;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 80%;
  }

  .heading-info {
    width: 50%;
  }

  .nav-buttons-container {
    width: 90%;
    justify-content: space-around;
  }

  .graph-preview-container {
    flex-wrap: wrap;
    justify-content: space-between;
    width: 85%;
    margin: 0px auto;
  }

  .graph-item {
    margin-bottom: 20px;
  }
}
</style>
