<script>
  import axios from "axios";
  import { link } from "svelte-routing";
  import Footer from "../../components/Footer.svelte";
  const url = "http://localhost:3000";
  let data = {};
  export let id;
  const fetchData = (async () => {
    const response = await axios.get(`${url}/api/v1/artikel/${id}`);
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
  <section class="article">
    <div class="container">
      <div class="card">
        <img
          src={`${url}${data.image}`}
          class="card-img-top"
          alt={data.title} />
        <div class="card-body pt-4">
          <div class="card-detail">
            <span>
              <i class="fas fa-user-circle" />
              {#if data.userId}{data.userId.name}{/if}
            </span>
            <span class="ml-10">{data.created}</span>
          </div>
          <h1 class="card-title mt-2">{data.title}</h1>
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>
