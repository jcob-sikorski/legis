export default function TNoTemplate({data} : any) {
    return ( <section className="text-gray-600 body-font">
      <h1>No section_id matched!</h1>
      <h3>Data: {JSON.stringify(data)}</h3>
  </section>);
}