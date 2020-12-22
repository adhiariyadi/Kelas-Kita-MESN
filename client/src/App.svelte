<script>
  import { Router, Route, Link } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Student from "./pages/student/Index.svelte";
  import StudentDetail from "./pages/student/Detial.svelte";
  import Picket from "./pages/Picket.svelte";
  import Schedule from "./pages/Schedule.svelte";
  import Article from "./pages/article/Index.svelte";
  import ArticleDetail from "./pages/article/Detail.svelte";
  export let url = "";
</script>

<Router {url}>
  <nav class="navbar navbar-expand-md">
    <div class="container">
      <div class="navbar-brand">
        <Link to="/">
          <img
            src="http://localhost:5000/images/logo2.png"
            alt="Logo"
            height="30" />
        </Link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-bars" />
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <Link to="/">
              <div class="nav-link">Home</div>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/student">
              <div class="nav-link">Daftar Siswa</div>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/picket">
              <div class="nav-link">Jadwal Piket</div>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/schedule">
              <div class="nav-link">Jadwal Pelajaran</div>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="/article">
              <div class="nav-link">Artikel</div>
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000/admin/signin">
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="app">
    <Route path="/" component={Home} />
    <Route path="/student" component={Student} />
    <Route path="/student/:id" component={StudentDetail} />
    <Route path="/picket" component={Picket} />
    <Route path="/schedule" component={Schedule} />
    <Route path="/article" component={Article} />
    <Route path="/article/:id" component={ArticleDetail} />
  </div>
</Router>
