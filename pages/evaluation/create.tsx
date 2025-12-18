import React, {useEffect, useState} from 'react';

import FilterButton from '@/components/DropdownFilter';
// import Datepicker from '../components/Datepicker';
// import FilterButton from '../components/DropdownFilter';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/Tremor/Tabs"

import Banner from '@/components/Plugins/Banner';
import Header from '@/components/Plugins/Header';
import Sidebar from '@/components/Plugins/Sidebar';

import {Textarea} from '@/components/Tremor/TextArea';
import {Label} from '@/components/Tremor/Label';
import {Input} from '@/components/Tremor/Input';
// import DashboardCard01 from '@/components/partials/dashboard/DashboardCard01';
import {TextInput} from '@mantine/core';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Tremor/Select"
import {Button} from "@/components/Tremor/Button";
// import React from 'react';
// import { TextInput, TextArea, Select, SelectItem, Button } from '@tremor/react';
import {useFetch} from '@/hooks/useFetch';
import Link from "next/link"; // Assuming you have the useFetch hook
import { useEvaluationPayloads, EvaluationFormData } from '../../utils/app/payloads';

interface DatasetConfig {
  [key: string]: any; // Use appropriate types for your keys and values
}

interface RegressionSchema {
  DatasetConfig: DatasetConfig;
}

interface CustomizationData {
  RegressionSchema?: RegressionSchema;
}


const EvaluationForm = ({
                          formData,
                          customizationData,
                          handleInputChange,
                          handleCustomizerChange,
                          handleParameterChange,
                          handleSystemChange,
                          handleSubmit,
                          payloads,
                          system,
                        }) => {
  // console.log("customizationData", customizationData);
  return (
    <div style={{maxWidth: "600px", margin: "0 auto", padding: "20px"}}>
      <h2>Bot selection</h2>
      <div className="pb-4">
        <Select value={system} onValueChange={(v) => handleSystemChange(v)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select bot"/>
          </SelectTrigger>
          <SelectContent>
           {
              Object.keys(payloads).map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>

      </div>
      <Label htmlFor="Project">Project</Label>
      <Input
        // label="Project"
        className="pb-2"
        value={formData?.Project || ""}
        name="Project"
        onChange={handleInputChange}
        placeholder="Enter Project name"
      />

      <Label htmlFor="RunType">RunType</Label>
      <Input
        // label="Run Type"
        className="pb-2"
        value={formData?.RunType || ""}
        name="RunType"
        onChange={handleInputChange}
        placeholder="Enter Run Type"
      />

      <Label htmlFor="Model">Model</Label>
      <Input
        // label="Model"
        className="pb-2"
        value={formData?.Model || ""}
        name="Model"
        onChange={handleInputChange}
        placeholder="Enter Model name"
      />

      <Label htmlFor="UserId">UserId</Label>
      <Input
        // label="User ID"
        className="pb-2"
        value={formData?.UserId || ""}
        name="UserId"
        onChange={handleInputChange}
        placeholder="Enter User ID"
      />

      <Label htmlFor="Environment">Environment <span
        className="text-gray-600 text-xs">(sandbox, dev, stg)</span></Label>

      <Input
        // label="Environment"
        className="pb-2"
        value={formData?.Env || ""}
        name="Env"
        onChange={handleInputChange}
        placeholder="Enter Environment"
      />

      <Label htmlFor="Tags">Tag</Label>
      <Input
        // label="Tag 1"
        value={formData.Parameters?.tag1 || ""}
        name="Tag"
        onChange={handleParameterChange}
        placeholder=''
      />
      <hr/>
      <h5 className="mt-5">[Optional] choose dataset (<a
        className="underline text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200"
        href={`https://confluence.nvidia.com/x/9JCRz`}
      >guide
      </a>)</h5>

      <Label htmlFor="DatasetFoldername">Dataset folder name</Label>
      <Input
        // label="Dataset"
        value={customizationData && customizationData?.RegressionSchema && customizationData?.RegressionSchema?.DatasetConfig ? customizationData?.RegressionSchema?.DatasetConfig?.Name || "" : ""}
        name="Name"
        onChange={handleCustomizerChange}
        placeholder=''
      />
      <Label htmlFor="DatasetPath">Filename</Label>
      <Input
        // label="Datasetname"
        value={customizationData && customizationData?.RegressionSchema && customizationData?.RegressionSchema?.DatasetConfig ? customizationData?.RegressionSchema?.DatasetConfig?.DatasetPath || "" : ""}
        name="DatasetPath"
        onChange={handleCustomizerChange}
        placeholder='.xlsx'
      />
    </div>
  );
};


const STATIC_PAYLOADS = {
  "nvhelp": {
    "Project": "nvbot_for_nvhelp_mixtral_agent_complete_evaluation",
    "RunType": "manual",
    "System": "nvhelp",
    "Model": "mixtral_agent",
    "UserId": "nvbot-evaluation",
    "Env": "dev",
    "Parameters": {}
  },
  "nvinfo": {
    "Project": "nvinfo_mixtral_agent_complete_evaluation",
    "RunType": "manual",
    "System": "nvinfo",
    "Model": "mixtral_agent",
    "UserId": "nvbot-evaluation",
    "Env": "sandbox",
    "Parameters": {}
  },
  // "scout": {
  //   "Project": "scout_mixtral_complete_evaluation",
  //   "RunType": "manual",
  //   "System": "scout",
  //   "Model": "mixtral",
  //   "UserId": "nvbot-evaluation",
  //   "Env": "sandbox",
  //   "Parameters": {}
  // },
  "scout_long": {
    "Project": "scout_long_mixtral_complete_evaluation",
    "RunType": "manual",
    "System": "scout_long",
    "Model": "mixtral",
    "UserId": "nvbot-evaluation",
    "Env": "sandbox",
    "Parameters": {}
  },
  "perceptor": {
    "Project": "orchestrator_perceptor_complete_evaluation",
    "RunType": "manual",
    "System": "orchestrator_perceptor",
    "Model": "llama_3_1",
    "UserId": "nvbot-evaluation",
    "Env": "sandbox",
    "Parameters": {}
  },
  "developer_knowledge_expert": {
    "Project": "developer_knowledge_expert_complete_evaluation",
    "RunType": "manual",
    "System": "developer_knowledge_expert",
    "Model": "llama_3_1_agent_graph",
    "UserId": "nvbot-evaluation",
    "Env": "sandbox",
    "Parameters": {}
  }
}

function EvaluationCreation() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {get, post} = useFetch();
  const { payloads, loading: loadingPayloads } = useEvaluationPayloads(STATIC_PAYLOADS, get, "PlatformBasedConfig");
  const [system, setSystem] = useState("")
  const [formData, setFormData] = useState<EvaluationFormData>({} as EvaluationFormData);

  const [customizationData, setCustomizationData] = useState<CustomizationData>({});
  const [flowConfig, setFlowConfig] = useState({});

  useEffect(() => {
    if (payloads && Object.keys(payloads).length > 0) {
      // If system is not set, use the first available system
      if (!system || !payloads[system]) {
        const firstSystem = Object.keys(payloads)[0];
        setSystem(firstSystem);
        setFormData(payloads[firstSystem]);
      } else {
        setFormData(payloads[system]);
      }
    }
  }, [payloads, system]);

  // Handler for general input change
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handler for Parameters object
  const handleParameterChange = (e) => {
    const {name, value} = e.target;
    // const tags = value.split(",").map(tag => tag.trim()); // Split and trim the tags
    setFormData((prevData) => ({
      ...prevData,
      Parameters: value ? {tag1: value} : {}
    }));
  };
  const handleCustomizerChange = (
    e
  ) => {
    const {name, value} = e.target;

    setCustomizationData((prevData) => ({
      ...prevData,
      RegressionSchema: {
        DatasetConfig: {
          ...(prevData.RegressionSchema?.DatasetConfig || {}),
          [name]: value,
        },
      },
    }));
  };


  useEffect(() => {
      const fetchData = async () => {
        
        try {
          const params = new URLSearchParams({
            "system": formData.System || "",
            "model": formData.Model || "",
            "env": formData.Env || ""
          });
          console.log("params", params)
          const url = 'https://devbot-api.nvidia.com/evaluation/bot_flowconfig'

          const response = await get(`${url}?${params.toString()}`, {
            headers: {
              accept: 'application/json',
            }
          });

          // Handle success response
          console.log('Config fetched successfully:', response);
          setFlowConfig(prev => {
              return {
                ...prev,
                "PlatformConfig": response
              }
            }
          )
        } catch
          (error) {
          // Handle error response
          console.error('Error fetching Config:', error);
        }
      }
      fetchData();

      // Call the fetch function whenever system or model changes
      if (formData && formData.System && formData.Model && formData.Env) {
      }
    }, [system, formData]
  )
  

  // Handler for dropdown System selection
  const handleSystemChange = (v) => {
    setSystem(v);
    setCustomizationData({});
  };

  // Handler for form submission
  const handleSubmit = async () => {
    // console.log("!customizationData", customizationData, Object.keys(customizationData).length)
    if (Object.keys(customizationData).length !== 0) {
      formData.Customization = customizationData
      formData.Customization.RegressionSchema.DatasetConfig.Engine = "s3"
    } else {
      if (formData.hasOwnProperty("Customization")) {
        delete formData["Customization"];
      }
    }

    try {
      const response = await post('https://devbot-api.nvidia.com/evaluation/run', {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: formData,
      });
      // Show success alert
      alert('✅ Evaluation submitted successfully!');
      console.log('Success:', response);
    } catch (error) {
      // Show error alert
      alert('Error submitting evaluation. Please try again.');
      console.error('Error:', error);
    }
  };

  
  return (
    <div className="flex h-screen overflow-hidden ">

      <div
        className="w-screen col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">

        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 mb-2">

          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Evaluation Creation</h2>
            <Button variant="secondary"
                    onClick={handleSubmit} // Add download handler
            >Submit</Button>
          </div>
        </header>


        <div className="sm:auto-cols-max justify-start sm:justify-end px-2 w-full overscroll-x-auto ">

          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">General Setup</TabsTrigger>
              <TabsTrigger value="tab2">Bot configuration</TabsTrigger>
              {/*<TabsTrigger value="tab3">Evaluation configuration</TabsTrigger>*/}
            </TabsList>
            <div className="ml-2 mt-4">
              <TabsContent
                value="tab1"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                {/*<p>*/}
                {/*  Refer to <a href="https://confluence.nvidia.com/display/ITAppDev/Bot+Evaluation+Onboarding+Guide">onboarding*/}
                {/*  guide</a>.*/}
                {/*</p>*/}
                {loadingPayloads ? <div>Loading...</div>: 
                (formData && 
                <div>
                  <EvaluationForm
                    formData={formData}
                    customizationData={customizationData}
                    handleInputChange={handleInputChange}
                    handleCustomizerChange={handleCustomizerChange}
                    handleParameterChange={handleParameterChange}
                    handleSystemChange={handleSystemChange}
                    handleSubmit={handleSubmit}
                    payloads={payloads}
                    system={system}
                  />
                </div>)
                }
              </TabsContent>
              <TabsContent
                value="tab2"
                className="space-y-2 text-sm leading-7 text-gray-600 dark:text-gray-500"
              >
                <Label htmlFor="FlowConfig">Configs</Label>
                <Textarea
                  className="h-[562px]"
                  value={JSON.stringify(flowConfig, null, 2)}
                  name="FlowConfig"
                  onChange={(e) => {
                    setFlowConfig(JSON.parse(e.target.value));
                  }}
                  placeholder='Add your customizable bot configurations here'
                />
              </TabsContent>
            </div>
          </Tabs>

        </div>
      </div>
      {/* Cards */}
      {/* <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
            </div> */}
      {/* <div className="flex w-full">
              <TableComponent></TableComponent>
            </div> */}
    </div>
  );
}

export default EvaluationCreation;
