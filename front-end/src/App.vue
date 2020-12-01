<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom py-0">
      <router-link class="navbar-brand" to="/"><img src='/images/logo.png'></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/standard-works">Standard Works</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/word-relations">Word Relations</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gallery">Graph Gallery</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Help</a>
            </li>
        </ul>
      </div>
    </nav>
    <router-view/>
    <div class='footer'>
      <a href='https://github.com/bwood614/scripture-search'  target='_blank'>GitHub Repository</a>
      <router-link to="/about">About</router-link>
      <a href='#'>Help</a>
    </div>
  </div>
</template>

<style>
#app {
  color: #414141;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* navbar layout*/
.navbar-custom {
  background-color: #FFFFFF;
  border-bottom: 3px solid #414141;
  width: 95%;
  margin: 0px auto;
}

/* navbar links */
.navbar-custom .navbar-nav .nav-link {
    color: #414141;
}
/* sctive and hovered links */
.navbar-custom .nav-item .active .nav-link,
.navbar-custom .nav-item:hover .nav-link {
    color: #72A7A0;
}

.instruction-container {
  width: 80%;
  margin: 0px auto;
}

/*footer*/
.footer {
  height: 50px;
  background-color: #72A7A0;
  display: flex;
  justify-content:space-around;
  align-items: center;
}

.footer a {
  color: white;
}

/*global mobile styles*/
@media only screen and (max-width: 500px) {
  .page {
    flex-wrap: wrap;
  }
}

</style>
