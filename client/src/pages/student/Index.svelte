<script>
  import axios from "axios";
  import { link } from "svelte-routing";
  import Footer from "../../components/Footer.svelte";
  const url = "http://localhost:3000";
  let dataStudent = [];
  const fetchData = (async () => {
    const response = await axios.get(`${url}/api/v1/siswa`);
    dataStudent = response.data;
    return { dataStudent };
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
      </div>
    </div>
  </section>

  <Footer />
</div>
