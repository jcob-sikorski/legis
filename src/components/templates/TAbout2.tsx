import { faker } from "@faker-js/faker";

export default function TAbout2({data} : any) {
    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font bg-primary-100">
    <div>
      <div className="container mx-auto my-0 gap-0 ">
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-20 py-10 items-center">
          <div className="col-span-6 flex flex-col gap-6">
            <Eyebrow label="About Us" />
            <h2 className="font-display md:text-display-xl text-display-md font-normal pb-4">
                We can help you in all your cases
            </h2>
            <p className="md:text-body-lg text-body-md font-light text-neutral-700">
              {data?.paragraph}
            </p>
          </div>
          
          <div className="col-span-6 flex flex-col gap-8 relative">
          <img
              src={faker.image.url()}
              alt="Interior Design"
              style={{borderRadius: 16}}
            />
          <img
              src={faker.image.url()}
              alt="Interior Design"
              style={{borderRadius: 16}}
            />
          </div>
        </div>
      </div>
    </div>
  </section>);
}

const Eyebrow = ({ label } : any) => {
    return (
        <div className="flex flex-row items-center opacity-80">
        <hr className="w-16 text-primary-600"></hr>
        <p className="text-body-sm font-semibold tracking-widest text-primary-600 pl-4">
            {label}
        </p>
        </div>
    );
};