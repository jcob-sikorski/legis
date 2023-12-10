import {
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  TreeSelect,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import {
  DEV_JSON_TO_INJECT,
  RIGHT_BAR_WIDTH,
  TEMPLATES_HEROS,
  templatesMap,
} from "./const";
import { useEffect, useState } from "react";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useParams } from "react-router-dom";
const { Sider } = Layout;

import PROFILES from "../../templates/profiles.json";

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  ArrowRightOutlined,
  DeleteFilled,
  EditOutlined,
  FireOutlined,
  LeftSquareOutlined,
  LinkOutlined,
  MinusOutlined,
  PlusOutlined,
  RocketOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import ImageUploadInput from "./ImageUploadInput";
import { FieldContext, FieldType, JSONProfileField } from "../../../models";
import { camelCase, switchTemplateSet } from "../../../utils";
import { v4 } from "uuid";

function Interface({
  json,
  setJson,
  data,
  setData,
  processJson,
  functions,
  variables,
}: any) {
  const {
    onAddSection,
    setSelectedSectionId,
    setSelectedTemplateId,
    onDeploy,
    setIsDevMode,
    setIsDeploying,
    setContext,
  } = functions ?? {};
  const {
    selectedSectionId,
    selectedTemplateId,
    isDevMode,
    isDeploying,
    context,
  } = variables;

  const { site_id } = useParams();

  // profiles & fields
  const profiles: any = PROFILES;
  const [profile, setProfile] = useState<any>({});
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    const newProfile = selectedTemplateId ? profiles[selectedTemplateId] : {};
    console.log("selected profile template: ", newProfile);
    setProfile(newProfile);
    setFields(newProfile?.fields ?? []);
  }, [selectedTemplateId]);

  const handleFormChange = (changedValues: any, allValues: any) => {
    console.log("allValues: ", allValues);
    setData(
      [...data].map((x: any) =>
        x?.section_id === selectedSectionId ? { ...x, ...allValues } : x
      )
    );
    console.log("data: ", data);
    console.log("selectedSectionId: ", selectedSectionId);
  };

  console.log("selectedTemplateId: ", selectedTemplateId);
  console.log();

  function handleCustomFieldChange(valueKeyPair: any) {
    console.log("handleCustomFieldChange: ", valueKeyPair);
    setData(
      [...data].map((x: any) =>
        x?.section_id === selectedSectionId ? { ...x, ...valueKeyPair } : x
      )
    );
  }

  function handleSerialFieldChange(
    section_id?: string,
    collection?: string,
    valueKeyPair?: any,
    index?: number
  ) {
    console.log("collection", collection);
    console.log("valueKeyPair", valueKeyPair);
    console.log("index", index);

    // safeguard
    if (!section_id || !collection || !valueKeyPair || (!index && index !== 0))
      return;

    const newData = [...data].map((x: any) =>
      x?.section_id === section_id
        ? {
            ...x,
            [collection]: [
              ...x[collection].map(
                // x yes
                (y: any, i: number) =>
                  i === index
                    ? { ...y, ...valueKeyPair } // y yes
                    : y
              ),
            ],
          } // y no
        : x
    ); // x no
    setData(newData);
    console.log("setting data to: ", newData);
  }

  function onDesignSetSelected(value: string) {
    assertTemplateIds(switchTemplateSet(value));
  }

  function assertTemplateIds(templateIds: string[]) {
    let newData = [...data]?.map((x: any, i: number) => ({
      ...x,
      template_id: templateIds[i],
    }));
    setData(newData);
    // newData = newData?.map
  }

  // function onRemoveSection() {
  //   setData((data ?? []).filter((s: any) => s.section_id !== selectedSectionId))
  //   setSelectedSectionId("");
  //   setSelectedTemplateId("");
  // }

  // function onTemplateChange(template_id: string) {
  //   setSelectedTemplateId(template_id);
  //   setData((data ?? []).map((s: any) => s.section_id === selectedSectionId ? {...s, template_id} : s))
  // }

  function injectData() {
    try {
      if (data) {
        console.log(JSON.parse(DEV_JSON_TO_INJECT));
        setData(JSON.parse(DEV_JSON_TO_INJECT));
      }
    } catch {
      alert("Dev: Error parsing DEV_JSON_TO_INJECT");
    }
  }

  // const { fields } = profile;

  // "super-heading": 1,
  // "heading": 1,
  // "sub-heading": 1,
  // "btn-label": 1,
  // "bg-image": 1

  function getSerialFieldValue(
    section_id?: string,
    collection?: string,
    key?: string,
    index?: number
  ) {
    console.log(!section_id, !collection, !key, !index && index !== 0);
    if (!section_id || !collection || !key || (!index && index !== 0))
      return {};
    const col = data?.filter((x: any) => x?.section_id === section_id)[0][
      collection
    ];
    if (col.length > index) {
      return col[index][key];
    } else {
      if (col.length > 0) {
        return col[index - 1][key];
      } else {
        return {};
      }
    }
    // console.log("getSerialFieldValue: ", res)
    // return res;
  }

  function getFieldValue(section_id?: string, key?: string) {
    const col = data?.filter((x: any) => x?.section_id === section_id)[0];
    if (!key) return "";
    if (col[key]) {
      return col[key];
    } else return "";
    // console.log("getSerialFieldValue: ", res)
    // return res;
  }

  const itemStyle = { margin: "0", padding: 0 };

  function switchField(field: FieldContext): any {
    if (!field) return <>No field selected rn!</>;

    let type: FieldType | undefined = field?.type;
    let label: string | undefined = field?.label;
    let key: string | undefined = field?.key;
    let index: number | undefined = field?.index;
    let ratio: number | undefined = field?.ratio;
    let collection: string | undefined = field?.collection;
    let isGroup: boolean | undefined = field?.isGroup;
    let isSection: boolean | undefined = field?.isSection;
    let cdnUUID: string | undefined = field?.cdnUUID;
    let seriableId: string | undefined = field?.seriableId;
    let inputSize: number[] | undefined = field?.inputSize;

    let section_id: string | undefined = field?.section_id;

    const generatedKey =
      "field" + type + label + key + index + ratio + seriableId;

    console.log("gK: ", generatedKey);

    const labelComponent = (forcedLabel?: string) => (
      <Typography.Title
        color="#333"
        level={5}
        style={{
          margin: "15px 0 0 0",
          padding: 0,
          width: "100%",
          fontWeight: 300,
        }}
      >
        {forcedLabel ? forcedLabel : label?.toUpperCase()}
      </Typography.Title>
    );

    function changeToSerialCall(valueKeyPair: any) {
      handleSerialFieldChange(section_id, collection, valueKeyPair, index);
    }

    if (index || index === 0) {
      console.log("seriable field: ", field);
      // field is SERIABLE
      if (isGroup) {
        switch (collection) {
          case "lawyerDetails": {
            return (
              <div key={generatedKey}>
                {/* IMPORTANT: WHEN CALLING switchField recursively you NEED to pass the section_id value for it to work properly. In templates appending section_id is done automatically inside a middleware - any calls outside of Template switch don't have section_id appended automatically tho! watch out  */}
                {switchField({
                  section_id,
                  seriableId,
                  collection: "lawyerDetails",
                  seriableLabel: "lawyer",
                  key: "name",
                  label: "Lawyer name",
                  type: "text",
                  index,
                })}
                {switchField({
                  section_id,
                  seriableId,
                  collection: "lawyerDetails",
                  seriableLabel: "lawyer",
                  key: "role",
                  label: "Role",
                  type: "text",
                  index,
                })}
                {switchField({
                  section_id,
                  seriableId,
                  collection: "lawyerDetails",
                  seriableLabel: "lawyer",
                  key: "description",
                  label: "Lawyer Description",
                  type: "textarea",
                  index,
                })}
                {switchField({
                  section_id,
                  seriableId,
                  cdnUUID,
                  collection: "lawyerDetails",
                  seriableLabel: "lawyer",
                  key: "cdnUUID",
                  type: "image",
                  ratio: 1,
                  label: "Profile Picture",
                  index,
                })}
              </div>
            );
          }
        }
      } else {
        if (typeof key !== "string") return <>No key specified</>;
        switch (type) {
          case "text":
            return (
              <div key={generatedKey}>
                {labelComponent()}
                <Form.Item
                  className="animate__slideIn"
                  name={generatedKey}
                  style={itemStyle}
                >
                  <Input
                    defaultValue={getSerialFieldValue(
                      section_id,
                      collection,
                      key,
                      index
                    )}
                    onChange={(e) =>
                      handleSerialFieldChange(
                        section_id,
                        collection,
                        { [key as string]: e.target.value },
                        index
                      )
                    }
                    bordered={false}
                    style={{
                      borderRadius: 12,
                      backgroundColor: "white",
                      height: 40,
                    }}
                  />
                </Form.Item>
              </div>
            );
          case "textarea":
            return (
              <div key={generatedKey}>
                {labelComponent()}
                <Form.Item
                  className="animate__slideIn"
                  name={generatedKey}
                  style={itemStyle}
                >
                  <TextArea
                    rows={10}
                    defaultValue={getSerialFieldValue(
                      section_id,
                      collection,
                      key,
                      index
                    )}
                    onChange={(e) =>
                      handleSerialFieldChange(
                        section_id,
                        collection,
                        { [key as string]: e.target.value },
                        index
                      )
                    }
                    bordered={false}
                    style={{ borderRadius: 12, backgroundColor: "white" }}
                  />
                </Form.Item>
              </div>
            );
          case "checkbox":
            return (
              // DEPRACATED
              <div key={generatedKey}>
                {labelComponent()}
                <Form.Item
                  className="animate__slideIn"
                  name={key}
                  style={itemStyle}
                >
                  <Radio.Group
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Radio value="1">Yes</Radio>
                    <Radio value="">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            );
          case "image": {
            // Select current photo cdn uuid
            let oldUUID = "";
            if (cdnUUID) {
              oldUUID = cdnUUID || "";
            } else {
              data.map((x: any) => {
                if (x?.section_id === selectedSectionId) oldUUID = "";
              });
            }

            return (
              <div key={generatedKey}>
                {labelComponent()}
                <Form.Item
                  className="animate__slideIn"
                  name={key}
                  style={itemStyle}
                >
                  <ImageUploadInput
                    inputSize={inputSize}
                    ratio={ratio}
                    handleCustomFieldChange={changeToSerialCall} // for serial values we append serial context fields. For more info see FieldContext model.
                    oldUUID={oldUUID}
                    fieldKey={key && key !== "_" ? key : "cdnUUID"}
                  />
                </Form.Item>
              </div>
            );
          }
          default: {
            return (
              <>
                No input of type <b>{type}</b> matched
              </>
            );
          }
        }
      }
    } else {
      switch (type) {
        case "text":
          return (
            <div key={generatedKey}>
              {labelComponent()}
              <Form.Item
                className="animate__slideIn"
                name={key}
                style={itemStyle}
              >
                <Input
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    backgroundColor: "white",
                    height: 40,
                  }}
                />
              </Form.Item>
            </div>
          );
        case "textarea":
          return (
            <div key={generatedKey}>
              {labelComponent()}
              <Form.Item
                className="animate__slideIn"
                name={key}
                style={itemStyle}
              >
                <TextArea
                  rows={10}
                  bordered={false}
                  style={{ borderRadius: 12, backgroundColor: "white" }}
                />
              </Form.Item>
            </div>
          );
        case "checkbox":
          return (
            // DEPRACATED
            <div key={generatedKey}>
              {labelComponent()}
              <Form.Item
                className="animate__slideIn"
                name={key}
                style={itemStyle}
              >
                <Radio.Group
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="">No</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          );
        case "image": {
          // Select current photo cdn uuid
          let oldUUID = "";
          if (cdnUUID) {
            oldUUID = cdnUUID || "";
          } else {
            data.map((x: any) => {
              if (x?.section_id === selectedSectionId) oldUUID = "";
            });
          }

          return (
            <div key={generatedKey}>
              {labelComponent()}
              <Form.Item
                className="animate__slideIn"
                name={key}
                style={itemStyle}
              >
                <ImageUploadInput
                  inputSize={inputSize}
                  ratio={ratio}
                  handleCustomFieldChange={handleCustomFieldChange}
                  oldUUID={oldUUID}
                  fieldKey={key && key !== "_" ? key : "cdnUUID"}
                />
              </Form.Item>
            </div>
          );
        }
        case "button":
          return (
            <div key={generatedKey}>
              {labelComponent("BUTTON")}
              {labelComponent("LABEL")}
              <Form.Item
                className="animate__slideIn"
                name={key + "Label"}
                style={itemStyle}
              >
                <Input
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    backgroundColor: "white",
                    height: 40,
                  }}
                />
              </Form.Item>
              {labelComponent("LINK")}
              <Form.Item
                className="animate__slideIn"
                name={key + "Link"}
                style={itemStyle}
              >
                <Input
                  bordered={false}
                  style={{
                    borderRadius: 12,
                    backgroundColor: "white",
                    height: 40,
                  }}
                />
              </Form.Item>
              {getFieldValue(section_id, key + "Link") ? (
                <a href={getFieldValue(section_id, key + "Link")}>
                  <Button
                    type="primary"
                    className="bg-blue-500 mt-1 w-full"
                    style={{ marginInline: "auto" }}
                    icon={<ArrowRightOutlined />}
                  >
                    {" "}
                    Simulate button click{" "}
                  </Button>
                </a>
              ) : (
                <Button
                  disabled
                  type="primary"
                  className="bg-blue-500 mt-1 w-full"
                  style={{ marginInline: "auto" }}
                  icon={<ArrowRightOutlined />}
                >
                  {" "}
                  Simulate button click{" "}
                </Button>
              )}
            </div>
          );
        default: {
          return (
            <>
              No serial input of type <b>{type}</b> matched
            </>
          );
        }
      }
    }
  }

  function switchVariantField(field: FieldContext) {
    if (!field) return <>No field selected rn!</>;

    console.log("field: ", field);

    let type: FieldType | undefined = field?.type;
    let label: string | undefined = field?.label;
    let key: string | undefined = field?.key;
    let index: number | undefined = field?.index;
    let ratio: number | undefined = field?.ratio;
    let collection: string | undefined = field?.collection;
    let variantProperty: string | undefined = field?.variantProperty;
    let seriableId: string | undefined = field?.seriableId;

    const generatedKey = "field-variant-" + type + label + key + index + ratio;

    const labelComponent = (
      <Typography.Title
        color="#333"
        level={5}
        style={{
          margin: "15px 0 0 0",
          padding: 0,
          width: "100%",
          fontWeight: 300,
        }}
      >
        {"ALIGNMENT"?.toUpperCase()}
      </Typography.Title>
    );

    switch (variantProperty) {
      case "marginInline":
        return (
          <div
            key={generatedKey}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {labelComponent}
            <Form.Item
              className="animate__slideIn"
              name={key + "Variant"}
              style={itemStyle}
            >
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 15,
                }}
              >
                <Radio.Button value="0 auto">
                  <AlignLeftOutlined />
                </Radio.Button>
                <Radio.Button value="auto auto">
                  <AlignCenterOutlined />
                </Radio.Button>
                <Radio.Button value="auto 0">
                  <AlignRightOutlined />
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
        );
      case "textAlign":
        return (
          <div
            key={generatedKey}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {labelComponent}
            <Form.Item
              className="animate__slideIn"
              name={key + "Variant"}
              style={itemStyle}
            >
              <Radio.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 15,
                }}
              >
                <Radio.Button value="start">
                  <AlignLeftOutlined />
                </Radio.Button>
                <Radio.Button value="center">
                  <AlignCenterOutlined />
                </Radio.Button>
                <Radio.Button value="end">
                  <AlignRightOutlined />
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
        );
      default: {
        return <></>;
      }
    }
  }

  function onAddSeriable(context: FieldContext) {
    const collection = context?.collection;
    const section_id = context?.section_id;
    const seriableLabel = context?.seriableLabel || "";
    const emptyObjectLabel = camelCase(seriableLabel);
    let lastIndex = 0;

    // safeguard
    if (!collection || !seriableLabel) return;

    const seriableId = v4();

    const emptyObject = (lastIndex: number) => {
      switch (collection) {
        case "areasList":
          return {
            practiceAreaName: `${emptyObjectLabel} ${lastIndex + 1}`,
            practiceDescription: `Description of ${emptyObjectLabel} ${
              lastIndex + 1
            }`,
            id: seriableId,
            cdnUUID: undefined,
          };
        case "valuesList":
          return {
            name: `${emptyObjectLabel} ${lastIndex + 1}`,
            description: `Description of ${emptyObjectLabel} ${lastIndex + 1}`,
            id: seriableId,
            cdnUUID: undefined,
          };
        case "lawyerDetails":
          return {
            name: `${emptyObjectLabel} ${lastIndex + 1}`,
            description: `Description of ${emptyObjectLabel} ${lastIndex + 1}`,
            role: "Team member",
            id: seriableId,
            cdnUUID: undefined,
          };
        default:
          return {};
      }
    };

    const newData = data.map((x: any) => {
      if (x?.section_id === selectedSectionId) {
        lastIndex = x[collection]?.length || 0;
        return {
          ...x,
          [collection]: [...x[collection], emptyObject(lastIndex)],
        };
      } else return x;
    });

    setContext({
      ...context,
      section_id,
      seriableId,
      isGroup: true,
      collection,
      index: lastIndex,
    });
    setData(newData);
  }

  function onRemoveSeriable(context: FieldContext) {
    const collection = context?.collection;
    const indexToRemove = context?.index;
    let lastIndex = 0;

    // safeguard
    if (!collection || !indexToRemove) return;

    const newData = [...data].map((x: any) => {
      if (x?.section_id === selectedSectionId) {
        lastIndex = x[collection]?.length || 0;
        if (lastIndex === 1 || lastIndex === 0) return x;
        return {
          ...x,
          [collection]: [
            ...x[collection].filter((_: any, i: number) => i !== indexToRemove),
          ],
        };
      } else return x;
    });

    setContext(null);
    setData(newData);
  }

  function switchRemoveSeriableField(context: FieldContext) {
    return (
      <Flex
        key={`add-field-${JSON.stringify(context)}`}
        style={{ paddingTop: 10 }}
        className="animate__slideIn"
      >
        <Button
          onClick={() => onRemoveSeriable(context)}
          type="primary"
          danger
          className="bg-red-900 mx-auto w-full hover:text-white"
          style={{ marginInline: "auto" }}
          icon={<DeleteFilled />}
        >
          Delete this {context?.seriableLabel || "element"}
        </Button>
      </Flex>
    );
  }

  function switchAddSeriableField(context: FieldContext) {
    return (
      <Flex
        key={`remove-field-${JSON.stringify(context)}`}
        style={{ paddingTop: 6 }}
        className="animate__slideIn"
      >
        <Button
          onClick={() => onAddSeriable(context)}
          type="primary"
          className="bg-blue-600 mx-auto w-full"
          style={{ marginInline: "auto" }}
          icon={<PlusOutlined />}
        >
          {" "}
          Add new {context?.seriableLabel || "element"}
        </Button>
      </Flex>
    );
  }

  const sectionsCount = data?.length ?? 0;

  const selectedTemplateProfile: any = profiles[selectedTemplateId];
  let selectOptions: any[] = [];

  if (selectedTemplateProfile) {
    const category: string = selectedTemplateProfile.metadata.category;
    selectOptions = templatesMap[category];
  }

  return (
    <div style={{ width: "100%" }}>
      {/* <Flex vertical className='my-5'>
          <Typography.Text>
            key: <b>{context?.key}</b> <br />
          </Typography.Text>
          <Typography.Text>
            type: <b>{context?.type}</b> <br />
          </Typography.Text>            
        </Flex> */}
      {/* <Space style={{padding: 25}}>
            dev mode
            <Switch checked={isDevMode} onClick={() => setIsDevMode(!isDevMode)} />
        </Space> */}
      {isDevMode && !isDeploying && (
        <>
          <button onClick={injectData}>Inject hard-coded data JSON</button>
          <Space>
            isDeploying
            <Switch
              checked={isDeploying}
              onClick={() => setIsDeploying(!isDeploying)}
            />
          </Space>
          <br /> selectedTemplateId: {selectedTemplateId} <br />
          <br /> 2: {selectedSectionId} <br />
          <TextArea
            style={{ minHeight: 300 }}
            value={json}
            onChange={(e: any) => setJson(e.target.value)}
          />
          json: {JSON.stringify(json)}
          <br />
          <br />
          data: {JSON.stringify(data)}
          <br />
          <br />
          profile: {JSON.stringify(profile)}
        </>
      )}

      {/* <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary" icon={<PlusOutlined />} onClick={onAddSection}>
            New section
        </Button> */}

      {sectionsCount && (
        <>
          {/* <Button style={{maxWidth: '190px', fontWeight: 'bold', backgroundColor: '#c00'}} type="primary" icon={<MinusOutlined />} size='large' onClick={onRemoveSection}>
              Remove section
          </Button> */}
          <Flex
            justify="center"
            vertical
            align="center"
            className="p-0 text-gray-500"
          >
            {/* <Typography.Title style={{fontSize: 18}} className='uppercase'>
              design sets
            </Typography.Title>

            <Radio.Group onChange={(e) => onDesignSetSelected(e.target.value)} style={{gap: 5, display: 'flex', maxWidth: '100%'}}>
              <Radio.Button value={'generic-dark'} >
                Generic Dark
              </Radio.Button>
              <Radio.Button value={'casual-light'} >
                Casual Light
              </Radio.Button>
            </Radio.Group> */}

            {/* <Typography.Title style={{fontSize: 18}} className='uppercase'>
              Try other templates
            </Typography.Title>
            
            <Radio.Group onChange={(e) => onTemplateChange(e.target.value)} style={{gap: 5, display: 'flex', maxWidth: '100%'}}>
              {selectOptions?.map((option: any) => <Radio.Button value={option.value} style={{width: 120, height: 60}}>
                <img src={option.image} style={{width: 100, height: 50}} />
                {option.label}
              </Radio.Button>)}
            </Radio.Group> */}
            {/* <Select
              defaultValue={selectedTemplateId}
              key={selectedSectionId + '-select'}
              style={{ width: 120 }}
              onChange={onTemplateChange}
              options={selectOptions}
            /> */}
          </Flex>
        </>
      )}

      {sectionsCount > 0 &&
        data
          .filter((d: any) => d?.section_id === selectedSectionId)
          .map(() => (
            <Form
              size="large"
              onValuesChange={handleFormChange}
              key={selectedSectionId + "-form"}
              layout="vertical"
              initialValues={
                data.filter(
                  (d: any) => d?.section_id === selectedSectionId
                )[0] ?? {}
              }
              style={{ width: RIGHT_BAR_WIDTH, padding: 10 }}
            >
              {/* {JSON.stringify(context)} */}
              {/* {fields && fields.map((field: JSONProfileField) => switchField(field))} */}
              {/* Field */}

              {!context?.isSection &&
              context?.section_id === selectedSectionId &&
              (context?.key || context?.isGroup) ? (
                <>
                  {(context?.index || context?.index === 0) && (
                    <>
                      {switchRemoveSeriableField(context)}
                      {switchAddSeriableField(context)}
                    </>
                  )}
                  {!context?.isSection && (
                    <>
                      {switchField(context)}
                      {switchVariantField(context)}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              {context?.isSection && (
                <>
                  <Typography.Title
                    color="#333"
                    level={5}
                    style={{
                      margin: "15px 0 0 0",
                      padding: 0,
                      width: "100%",
                      fontWeight: 500,
                    }}
                  >
                    {(context?.seriableLabel + " section").toUpperCase()}
                  </Typography.Title>
                  {switchRemoveSeriableField(context)}
                  {switchAddSeriableField(context)}
                </>
              )}
              {/* <Row >
            <Col span={12}>
              <Button style={{backgroundColor: '#090', width: '100%', color: 'white'}}>Save changes</Button>
            </Col>
            <Col span={12}>
              <Button style={{backgroundColor: '#c00', width: '100%', color: 'white'}}>Cancel</Button>
            </Col>
          </Row> */}
            </Form>
          ))}

      {!context?.key && !context?.isGroup && !context?.isSection && (
        <Flex
          className="flex items-center text-center bg-gray-200 h-80"
          style={{ width: "100%" }}
        >
          Select any element on canvas to open its settings
        </Flex>
      )}
    </div>
  );
}

{
  /* <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="HEADING">
        <Input />
      </Form.Item>
      <Form.Item label="SUB-HEADING">
          <TextArea rows={3} />
        </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="TreeSelect">
        <TreeSelect
          treeData={[
            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
          ]}
        />
      </Form.Item>
      <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [{ value: 'hangzhou', label: 'Hangzhou' }],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item> */
}

export default Interface;
