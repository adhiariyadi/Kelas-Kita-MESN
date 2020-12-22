<script>
  import axios from "axios";
  import Footer from "../components/Footer.svelte";
  const url = "http://localhost:3000/api/v1";
  let dataSchedule = [];
  const fetchData = (async () => {
    const response = await axios.get(`${url}/jadwal`);
    dataSchedule = response.data;
    return { dataSchedule };
  })();
</script>

<svelte:head>
  <title>Kelas Kita | Schedule</title>
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
        <h1>Jadwal Pelajaran</h1>
        <div class="divider mx-auto" />
      </div>
      <div class="section-body">
        {#each dataSchedule as data}
          <div class="card mb-5">
            <div class="card-header">
              <h3>{data.name}</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Mata Pelajaran</th>
                      <th>Jam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#if data.scheduleId.length > 0}
                      {#each data.scheduleId as val, index}
                        <tr>
                          <td>{index + 1}</td>
                          <td>{val.subjectId.name}</td>
                          <td>{val.start} - {val.end}</td>
                        </tr>
                      {/each}
                    {/if}
                    {#if data.scheduleId.length == 0}
                      <tr>
                        <td colspan="3" class="text-center">No Data</td>
                      </tr>
                    {/if}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <Footer />
</div>
