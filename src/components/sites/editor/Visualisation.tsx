import { Layout } from 'antd';
import { BAR_WIDTH } from './const';

// Templates
import TContact1 from '../../templates/TContact1';
import TContact2 from '../../templates/TContact2';
import TContact3 from '../../templates/TContact3';

const { Content, Footer } = Layout;

function Visualisation({
    data, // if anything arrives here in this data prop it's already "sanitized" and is an object structure. NOT a JSON! (You can access its values like data?.email or data?.phone, etc., but you can't change it here)
} : any) {

    function switchTemplate(data: any) {
        switch(data.template_id) {
            default: case 'TContact1':
                return <TContact1 data={data} />
            case 'TContact2':
                return <TContact2 data={data} />
            case 'TContact3':
                return <TContact3 data={data} />
        }
      }

    return ( <Layout className="site-layout" style={{ marginRight: BAR_WIDTH }}>
    <Content style={{ maxWidth: '1200px', margin: '24px 16px 0', overflow: 'initial' }}>
        {data && data.map((s: any) => switchTemplate(s))}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Legis - Footer</Footer>
  </Layout> );
}

export default Visualisation;