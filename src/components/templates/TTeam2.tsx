import { EditFilled } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { getUrl, switchIcon } from "../../utils";

export default function TTeam2({data} : any) {

    // const list = Array.from({ length: 5 }, () => ({
    //     name: faker.name.fullName(),
    //     description: faker.lorem.sentence(20),
    //     photo: faker.image.avatar()
    //   }));

      const list = data?.lawyerDetails ?? [];
      console.log("TTeam: ", JSON.stringify(data));


    return (<section id={'section-' + data.section_id} className="text-gray-600 body-font bg-primary-100">
      <div className="container mx-auto ">
        <div className="flex flex-col md:gap-10 gap-10 lg:py-14 md:py-14 py-14">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-8">
            <div className="lg:col-span-8">
              <Eyebrow label="Our Team" />
              <h2 className="font-display md:text-display-sm text-display-sm pt-5">
                {data?.description}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">

            {((list ?? []).map((area: any, i: number) => 
                <ServiceItem 
                    title={area?.name} 
                    description={area?.description} 
                    photo={getUrl(area?.photo)}
                    // icon={switchIcon(area?.name)}
                    left={i % 2 == 0}
                />
            ))}

          {/* {((data?.valuesList ?? []).map((area: any, i: number) => 
                <ServiceItem 
                    title={area?.name} 
                    description={area?.description} 
                    icon={switchIcon(area?.name)}
                    left={i % 2 == 0}
                />
            ))} */}
          </div>
        </div>
    </div>
  </section>);
}

const ServiceItem = ({ icon, title, description, photo }: any) => {
    return (
      <div className="flex flex-col gap-10 md:p-10 p-8 bg-white border border-primary-100" style={{borderRadius: 16}}>
        <div className="flex items-center gap-3" style={{borderRadius: '100px 32px 32px 100px'}}>

            <img src={photo} width={100} height={100} alt={title} style={{borderRadius: 1000}} />
            <p className="font-display text-start text-display-sm mt-0 p-0 font-normal">
            {title}
          </p>
        {/* <i className={`${icon} text-primary-600 m-0 flex justify-center`} style={{fontSize: 48}}></i> */}
        </div>
        <div className="flex flex-col gap-4 mt-0">
          
          <p className="text-body-lg text-center font-light text-neutral-700">
            {description}
          </p>
        </div>
      </div>
    );
  };

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