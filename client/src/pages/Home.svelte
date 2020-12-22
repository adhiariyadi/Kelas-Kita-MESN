<script>
  import axios from "axios";
  import { link } from "svelte-routing";
  import Hero from "../components/Hero.svelte";
  import Footer from "../components/Footer.svelte";
  const url = "http://localhost:3000";
  let dataStudent = [];
  let dataArticle = [];
  const fetchData = (async () => {
    const response = await axios.get(`${url}/api/v1/home`);
    dataStudent = response.data.student;
    dataArticle = response.data.article;
    return { dataStudent, dataArticle };
  })();
</script>

<svelte:head>
  <title>Kelas Kita | Home</title>
  <style>
    .articles {
      background-color: #f8fafc;
    }
  </style>
</svelte:head>

<div>
  <Hero />

  <section class="students">
    <div class="container">
      <div class="section-header text-center">
        <h1>Daftar Siswa</h1>
        <div class="divider mx-auto" />
      </div>
      <div class="section-body">
        <div class="row">
          {#each dataStudent as data}
            <div class="col-md-6 mb-5">
              <a href={`student/${data._id}`} class="card-student" use:link>
                <div class="card">
                  <div class="row">
                    <div class="col-4">
                      <img src={`${url}${data.image}`} alt={data.name} />
                    </div>
                    <div class="col-8 py-3 px-3">
                      <div class="student-name mb-2">{data.name}</div>
                      <p class="student-description">
                        {data.description.substring(0, 50)}
                        {#if data.description.length > 50}
                          ..
                          <span class="text-blue">Selengkapnya</span>
                        {/if}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          {/each}
        </div>
        <div class="text-right mt-5">
          <a href="student" use:link>
            Lihat Selengkapnya
            <i class="fas fa-angle-double-right" />
          </a>
        </div>
      </div>
    </div>
  </section>

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
        <div class="text-right mt-3">
          <a href="article" use:link>
            Lihat Selengkapnya
            <i class="fas fa-angle-double-right" />
          </a>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>
