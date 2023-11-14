import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import Button from "./Button";
export default function TNavBar2({data} : any) {
    const navigation: any[] = [
        {
            name: 'ZCXCZCZX',
            href: 'XZCCCACZ',
        },
        {
            name: 'ASIDUHAISD',
            href: 'daadsads'
        },
        {
            name: 'asdaadsad',
            href: 'dasdaadsads',
        }
    ];
    return (<header id={'section-' + data?.section_id} className="text-gray-600 body-font">    
    <div className="container mx-auto">
        <div className="flex py-5 justify-between items-center">
          <div className="flex flex-row gap-8 items-center font-semibold">
            <Link to="/">
                <h1>{data?.name}</h1>
              {/* <img className="h-8 w-auto" src={faker.image.url()} alt="Logo" /> */}
            </Link>
          </div>
          <div className="flex flex-row gap-6">
            <div className="md:flex hidden flex-row gap-4 items-center">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-body-sm font-medium text-neutral-700 hover:text-primary-600 px-4">
                  {item.name}
                </a>
              ))}
            </div>
            <Button label='CONTACT US'  link='#contact' />
          </div>
        </div>
      </div>
  </header>);
}


