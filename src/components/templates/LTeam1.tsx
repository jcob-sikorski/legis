import { faker } from "@faker-js/faker";
import { getUrl } from "../../utils";

export default function LTeam1({data} : any) {

    const list = data?.lawyerDetails ?? [];
    console.log("TTeam: ", JSON.stringify(data), " list: ", list);

    return <section className="py-12 bg-black sm:py-16 lg:py-20 xl:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-xl mx-auto text-center">
            <p className="text-sm font-bold tracking-widest uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]">Learn more about... </span>
            </p>
            <h2 className="mt-6 text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">Our Team</h2>
        </div>

        <div className="max-w-2xl mx-auto mt-12 space-y-12 sm:mt-16 lg:mt-20">
            
            {((list ?? []).map((person: any, i: number) => 
                <>
                    {i !== 0 && <div className="w-full h-px bg-gradient-to-r from-[var(--legis-color-1)] to-[var(--legis-color-2)]"></div>}
                    <div className="items-start sm:flex">
                        <img className="object-cover rounded-full w-44 h-44 shrink-0" 
                        src={data?.cdnUUID ? getUrl(data.cdnUUID) : "https://ucarecdn.com/8aea75a1-4036-48d7-8924-cfbe9375de7f/"} 
                        alt="" 
                        />
                        <div className="mt-6 sm:ml-10">
                            <div className="sm:items-center sm:flex">
                                <p className="text-2xl font-normal text-white">{person?.name ?? ""}</p>
                                <p className="mt-2 text-base font-normal text-gray-400 sm:mt-0 sm:ml-4">Team member</p>
                            </div>
                            <p className="mt-5 text-base font-normal text-gray-400">
                                {person?.description}
                            </p>
                        </div>
                    </div>
                </>
            ))}

            

            {/* <div className="items-start sm:flex">
                <img className="object-cover rounded-full w-44 h-44 shrink-0" src="https://landingfoliocom.imgix.net/store/collection/dusk/images/team/3/team-member-2.png" alt="" />
                <div className="mt-6 sm:ml-10">
                    <div className="sm:items-center sm:flex">
                        <p className="text-2xl font-normal text-white">Jacob Jones</p>
                        <p className="mt-2 text-base font-normal text-gray-400 sm:mt-0 sm:ml-4">Co-Founder, CTO</p>
                    </div>
                    <p className="mt-5 text-base font-normal text-gray-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu sodales id bibendum quis aliquam, quisque rhoncus. Dolor iaculis a vitae, at imperdiet. Aliquam sed quam blandit volutpat elementum, scelerisque consequat malesuada. Magna eget enim sem pellentesque.
                    </p>
                </div>
            </div> */}
        </div>
    </div>
</section>

}