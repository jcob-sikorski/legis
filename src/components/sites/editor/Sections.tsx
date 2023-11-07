import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

function Sections({functions, variables} : any) {

    const {onAddSection} = functions;

    return ( <Layout>
        <Button title='Click to add a new section' style={{width: '100%', fontWeight: 'bold'}} type="dashed" icon={<PlusOutlined />} onClick={onAddSection}>
            Add section
        </Button>
    </Layout> );
}

export default Sections;