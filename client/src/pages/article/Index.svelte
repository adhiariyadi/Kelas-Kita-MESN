<script>
  import axios from "axios";
  import { link } from "svelte-routing";
  import Footer from "../../components/Footer.svelte";
  const url = "http://localhost:3000";
  let dataArticle = [];
  const fetchData = (async () => {
    const response = await axios.get(`${url}/api/v1/artikel`);
    dataArticle = response.data;
    return { dataArticle };
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
  <section class="articles">
    <div class="container">
      <div class="section-header text-center">
        <h1>Artikel</h1>
        <div class="divider mx-auto" />
      </div>
      <div class="section-body">
        <div class="row">
          {#each dataArticle as data}
            <div class="col-md-4 mb-3">
              <div class="card">
                <img
                  src={`${url}${data.image}`}
                  alt={data.title}
                  class="card-img-top" />
                <div class="card-body">
                  <h3 class="card-title">
                    <a href={`article/${data._id}`} use:link>{data.title}</a>
                  </h3>
                  <p class="card-description">
                    {data.content.substring(0, 150)}
                    {#if data.content.length > 150}
                      ..
                      <a href={`article/${data._id}`} use:link>
                        Lihat selengkapnya
                      </a>
                    {/if}
                  </p>
                </div>
                <div class="card-footer">
                  <div class="card-author">
                    <i class="fas fa-user-circle" />
                    <span>{data.userId.name}</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>
