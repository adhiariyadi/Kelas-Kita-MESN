<script>
  import axios from "axios";
  import { link } from "svelte-routing";
  import Footer from "../../components/Footer.svelte";
  const url = "http://localhost:3000";
  let data = {};
  export let id;
  const fetchData = (async () => {
    const response = await axios.get(`${url}/api/v1/siswa/${id}`);
    data = response.data;
    return { data };
  })();
</script>

<svelte:head>
  <title>Kelas Kita | Student</title>
  <style>
    .navbar {
      background-color: rgba(74, 0, 224, 0.9);
    }

    .navbar-toggler i {
      color: #222;
    }
  </style>
</svelte:head>

<div>
  <section class="student">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <img src={`${url}${data.image}`} alt={data.name} />
        </div>
        <div class="col-md-9 sm:mt-5">
          <h1 class="mb-3">{data.name}</h1>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>
