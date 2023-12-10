import {
  DownOutlined,
  EditOutlined,
  FontSizeOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import Tree, { DataNode } from "antd/es/tree";
import { convertDataToDataNodes } from "../../../utils";

function Sections({ functions, variables }: any) {
  const { onAddSection, scrollToElement } = functions;
  const { data } = variables;

  const treeData: DataNode[] = convertDataToDataNodes(data, scrollToElement);

  // const treeData: DataNode[] = [
  //     {
  //       title: 'Hero/Banner',
  //       key: '0-0',
  //       icon: <StarOutlined />,
  //       children: [
  //         {
  //           title: 'Super-Heading',
  //           key: '0-0-0',
  //           icon: <EditOutlined />,
  //         },
  //         {
  //           title: 'Heading',
  //           key: '0-0-1',
  //           icon: <FontSizeOutlined />,
  //         },
  //       ],
  //     },
  //   ];

  return (
    <Layout>
      <Button
        title="Click to add a new section"
        style={{ width: "100%", fontWeight: "bold" }}
        type="dashed"
        icon={<PlusOutlined />}
        onClick={onAddSection}
      >
        Add section
      </Button>
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={["0-0-0"]}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
      />
    </Layout>
  );
}

export default Sections;
