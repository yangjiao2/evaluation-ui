import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/Tremor/Card';
import { Button } from '@/components/Tremor/Button';

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Documentation & FAQ
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find resources, documentation, troubleshooting guides, and frequently asked questions for the evaluation platform.
        </p>
      </div>

      {/* Resource Links Section */}
      <Card className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            📚 Resource Links
          </h2>
          {/* <p className="text-gray-600 dark:text-gray-400">
            Quick links to important documentation and monitoring tools
          </p> */}
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Documentation</h3>
              <div className="space-y-3">
                <a 
                  href="https://docs.google.com/document/d/1LBc5VCXMk48Kqe3SsO7FMXAwavzR3pKl4XwI_CU2V9I/edit?usp=sharing" 
                  target="https://docs.google.com/document/d/1LBc5VCXMk48Kqe3SsO7FMXAwavzR3pKl4XwI_CU2V9I/edit?usp=sharing" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">📖</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">User Guide</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Setup configuration & evaluation workflow guide</div>
                  </div>
                </a>
                <a 
                  href="https://nvidia-my.sharepoint.com/personal/yangj_nvidia_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fyangj%5Fnvidia%5Fcom%2FDocuments%2FRecordings%2FNVBot%20evaluator%20onboarding%2D20241031%5F150216%2DMeeting%20Recording%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E7264a703%2De43a%2D4049%2Da119%2De51ce2766b1d" 
                  target="https://nvidia-my.sharepoint.com/personal/yangj_nvidia_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fyangj%5Fnvidia%5Fcom%2FDocuments%2FRecordings%2FNVBot%20evaluator%20onboarding%2D20241031%5F150216%2DMeeting%20Recording%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E7264a703%2De43a%2D4049%2Da119%2De51ce2766b1d" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">🚀</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Onboarding Session</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Getting started with bot evaluation</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Monitoring & Scheduling</h3>
              <div className="space-y-3">
                <a 
                  href="https://nvitprod.datadoghq.com/logs?query=container_name%3Anvbot-evaluation%20-%22GET%20%2Fevaluation%20HTTP%2F1.1%22%20-%22WARNING%20%5Bddtrace.profiling.collector%22%20-%22WARNING%3Addtrace.profiling.collector%22%20-%22print_debug_info%22&agg_m=count&agg_m_source=base&agg_t=count&cols=service%2Chost&fromUser=true&messageDisplay=inline&refresh_mode=sliding&saved-view-id=2674827&storage=hot&stream_sort=host%2Cdesc&view=spans&viz=stream&from_ts=1758767442462&to_ts=1758768342462&live=true" 
                  target="https://nvitprod.datadoghq.com/logs?query=container_name%3Anvbot-evaluation%20-%22GET%20%2Fevaluation%20HTTP%2F1.1%22%20-%22WARNING%20%5Bddtrace.profiling.collector%22%20-%22WARNING%3Addtrace.profiling.collector%22%20-%22print_debug_info%22&agg_m=count&agg_m_source=base&agg_t=count&cols=service%2Chost&fromUser=true&messageDisplay=inline&refresh_mode=sliding&saved-view-id=2674827&storage=hot&stream_sort=host%2Cdesc&view=spans&viz=stream&from_ts=1758767442462&to_ts=1758768342462&live=true" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">📊</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Datadog Logs</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Real-time monitoring and logs</div>
                  </div>
                </a>
                <a 
                  href="https://nemo-eval-argo-workflow.nvidia.com/cron-workflows/nemo-evaluation" 
                  target="https://nemo-eval-argo-workflow.nvidia.com/cron-workflows/nemo-evaluation" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">🔄</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">Cron Job Dashboard</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Create scheduled job & Monitor cron job status</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            ❓ FAQ & Troubleshooting
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Common questions and visual guides for using the evaluation platform
          </p>
        </div>
        <div>
          <div className="space-y-8">
            


            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Which bot systems are available for evaluation?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                The platform supports evaluation of various bot systems by accepting predefined request payloads against deployed service endpoints, for example:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Platform-based bots (nvbot platform):</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">nvinfo</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">scout</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">perceptor</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">developer_knowledge_expert</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">API-based services:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">bugnemo</span>
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">servicenow_virtualagent</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Each system requires specific endpoint configurations and payload structures as defined in the respective configuration types.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What environments are supported?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The platform supports multiple environments for testing:
              </p>
              <div className="flex gap-2 mt-2">
                <span className="inline-block px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">sandbox</span>
                <span className="inline-block px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">dev</span>
                <span className="inline-block px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">stg</span>
                <span className="inline-block px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded">prd</span>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What are the different run types available?
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                
                {/* Triggered Run via UI Section */}
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded mb-2">1. Triggered Run via UI</span>
                  <p className="text-sm mb-3">
                    <strong>How to register a job:</strong> Update job config in <a 
                      href="https://gitlab-master.nvidia.com/jarvis-chatbot/evaluation/-/blob/develop/controllers/routers/project_router.py" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >project_router.py</a> to enable & update project for triggering from UI.
                  </p>
                  
                  <div className="ml-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">1. Platform-Based Configuration (Legacy bots on nvbot platform)</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs font-mono">
                        <div className="text-green-600 dark:text-green-400">"PlatformBasedConfig"</div>
                        <div className="ml-2">
                          <div className="text-blue-600 dark:text-blue-400">"nvinfo_llama4":</div>
                          <div className="ml-4 text-gray-600 dark:text-gray-400">
                            "Project": "nvinfo_llama4_complete_evaluation",<br/>
                            "RunType": "manual",<br/>
                            "System": "nvinfo",<br/>
                            "Model": "llama4",<br/>
                            "UserId": "nvbot-evaluation",<br/>
                            "Env": "dev",<br/>
                            "Parameters": {'{}'}<br/>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Access via: <a href="/evaluation/create" className="text-blue-600 dark:text-blue-400 hover:underline">/evaluation/create</a>
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">2. API-Based Configuration</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs font-mono">
                        <div className="text-green-600 dark:text-green-400">"APIBasedConfig"</div>
                        <div className="ml-2">
                          <div className="text-blue-600 dark:text-blue-400">"bugnemo":</div>
                          <div className="ml-4 text-gray-600 dark:text-gray-400">
                            "Project": "nvbugs_complete_evaluation",<br/>
                            "RunType": "manual",<br/>
                            "UserId": "nvbot-evaluation",<br/>
                            "System": "bugnemo",<br/>
                            "Env": "stg",<br/>
                            "PlatformConfig": {'{{'}<br/>
                            <div className="ml-4">
                              "ConfigType": "api",<br/>
                              "URL": "https://talktobugs-stg.nvidia.com/talk_to_your_bugs/query_eval/",<br/>
                              "Payload": {'{{'}<br/>
                              <div className="ml-4">
                                "flags": {'{{'}<br/>
                                <div className="ml-4">
                                  "enable_debug_info": true,<br/>
                                  "hybrid_search_fallback_in_agent": false,<br/>
                                  "enable_hybrid_fallback": false,<br/>
                                  "is_evaluator_pipeline": true<br/>
                                </div>
                                {'}}'}
                              </div>
                              {'}}'}
                            </div>
                            {'}}'}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Access via: <a href="/evaluation/createapi" className="text-blue-600 dark:text-blue-400 hover:underline">/evaluation/createapi</a>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm mt-3">
                    <strong>After successful creation:</strong> Project will be enabled for trigger from UI and visible under the respective evaluation creation pages.
                  </p>
                </div>

                {/* Schedule jobs via cron job scheduler */}
                <div>
                  <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded mb-2">2. Schedule jobs via cron job scheduler</span>
                  <p className="text-sm mb-3">
                    <strong>How to schedule automated jobs:</strong> Use ArgoWorkflow UI to create scheduled evaluation runs with cron expressions.
                  </p>
                  
                  <div className="ml-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Steps to create scheduled jobs:</h4>
                      <ol className="list-decimal list-inside text-sm space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Access the ArgoWorkflow UI dashboard</li>
                        <li>Click on <strong>"Create new cron workflow"</strong></li>
                        <li>Configure the cron schedule expression (e.g., <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">0 9 * * 1</code> for weekly Monday 9 AM)</li>
                        <li>Update the curl call within the workflow to trigger the evaluation job</li>
                        <li>Set the appropriate payload parameters for your bot configuration</li>
                        <li>Save and activate the cron workflow</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Example cron workflow configuration:</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs font-mono">
                        <div className="text-green-600 dark:text-green-400"># Cron schedule (runs every Monday at 9 AM)</div>
                        <div className="text-gray-600 dark:text-gray-400">
                          schedule: "0 9 * * 1"<br/>
                          <br/>
                          # Curl call within workflow:<br/>
                          curl -X POST https://devbot-api.nvidia.com/evaluation/run \<br/>
                          <div className="ml-4">
                            -H "Content-Type: application/json" \<br/>
                            -d '{`{`}'<br/>
                            <div className="ml-4">
                              "Project": "your_project_name",<br/>
                              "RunType": "scheduled",<br/>
                              "System": "your_system",<br/>
                              "UserId": "nvbot-evaluation",<br/>
                              "Env": "dev"<br/>
                            </div>
                            {`}`}'
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Common cron expressions:</h4>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">0 9 * * *</code> - Daily at 9:00 AM</div>
                        <div><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">0 9 * * 1</code> - Weekly on Monday at 9:00 AM</div>
                        <div><code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">0 9 1 * *</code> - Monthly on the 1st at 9:00 AM</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mt-3">
                    <strong>Further details:</strong> Comprehensive documentation available in the <a 
                      href="https://docs.google.com/document/d/1LBc5VCXMk48Kqe3SsO7FMXAwavzR3pKl4XwI_CU2V9I/edit?tab=t.nf9x4e601cxc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >evaluation guide</a>.
                  </p>
                </div>

                {/* Legacy Run Types */}
                <div>
                  <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded mb-2">Legacy Run Types</span>
                  <p className="text-sm">
                    <strong>Steps:</strong> Prepare data (download, convert) → Run (collect results via platform config, dump data) → Finish (Upload to S3, send email alerts)
                    <br />
                    <strong>Container:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">regression_container.py</code>
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    <strong>Steps:</strong> Prepare (collect results from S3, convert to evaluator service structure, upload to datastore) → Run (trigger evaluator service job with platform config) → Finish (associate evaluation_id in database, scan/download results)
                    <br />
                    <strong>Container:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">nemo_evaluation_container.py</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How do I configure a custom dataset for evaluation?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                In the evaluation creation form, you can optionally specify:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li><strong>Dataset folder name:</strong> The name of your dataset folder</li>
                <li><strong>Filename:</strong> The specific file (e.g., .xlsx format)</li>
                <li>
                  The system uses <a 
                    href="https://us-west-2.console.aws.amazon.com/s3/buckets/nvbot-evaluation?region=us-west-2&tab=objects" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >S3</a> for dataset storage with one folder per project
                </li>
                <li>
                  Dataset configurations are managed in <a 
                    href="https://gitlab-master.nvidia.com/jarvis-chatbot/evaluation/-/tree/develop/asset" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >project configuration</a> files
                </li>
              </ul>
            </div>


            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How do I start a eval run?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                1. Click "Evaluation" from the sidebar to access the evaluation creation page, then update only if needed:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                <Image 
                  src="/assets/howto_create.png" 
                  alt="Starting an evaluation run" 
                  width={600} 
                  height={300} 
                  className="rounded border"
                />
              </div>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">For example:
                <li><strong>Environment variable:</strong> Update the env field to decide which environment to run (sandbox, dev, stg, prd)</li>
                <li><strong>Dataset:</strong> Specify a dataset that has already been uploaded to the S3 bucket</li>
                <li><strong>Other fields:</strong> Most configuration is pre-set based on your bot system selection</li>
              </ul>
              <br></br>
              2. Click <strong>"Submit"</strong> to start the evaluation run

            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How do I search for specific evaluation runs?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Easily find specific evaluation runs using our powerful filtering system. You can search by project name, run type, and environment.
              </p>
              
              <div className="space-y-6">
                {/* Basic Search Example */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">🔍 Basic Search by Project Name</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Start by selecting "Name" from the dropdown, then enter your project name (e.g., <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">nvbugs_complete_evaluation</code>) in the input field:
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3">
                    <Image 
                      src="/assets/howto_search_filter.png" 
                      alt="Search by project name" 
                      width={600} 
                      height={300} 
                      className="rounded border mb-3"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Press 'Enter' to see your filtered results:</p>
                    <Image 
                      src="/assets/howto_search_result.png" 
                      alt="Search result by project name" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>

                {/* Advanced Filtering */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">🎯 Advanced Filtering</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Need more specific results? You can combine multiple filters. For example, to view only scheduled (automated) jobs, add a "RunType" filter with the value "cron":
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <Image 
                      src="/assets/howto_more_filters.png" 
                      alt="Additional filters - RunType cron" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>

                {/* Quick Tips */}
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">💡 Quick Tips</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><strong>Multiple filters:</strong> Combine filters by adding them one at a time using the "Select" dropdown</li>
                    <li><strong>Common filters:</strong> Project name, run type (manual/cron), environment (dev/stg/prd), and status</li>
                    <li><strong>Quick search:</strong> Use the main search bar for fast text-based filtering</li>
                    <li><strong>Clear filters:</strong> Remove individual filter tags by clicking the 'x' on each one</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-rose-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How do I navigate through evaluation history?
              </h3>

              
              <div className="space-y-6">
                {/* Pagination Navigation */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">📄 Page Navigation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Use the "Page" input box in the top right corner to jump directly to any page. The current page number is displayed, and you can see the maximum available page in parentheses (e.g., "Page (max 20)").
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <Image 
                      src="/assets/howto_view_history.png" 
                      alt="Navigate evaluation history with pagination" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>

                {/* Quick Tips */}
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">💡 Navigation Tips</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li><strong>Quick navigation:</strong> Type any page number and press 'Enter' to jump instantly</li>
                    <li><strong>Page capacity:</strong> Each page displays up to 50 evaluation runs for optimal loading</li>
                    <li><strong>Range awareness:</strong> The maximum page number is always shown to help you navigate</li>
                    <li><strong>Efficient browsing:</strong> Combine with filters to reduce the number of pages to browse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                How do I search logs for specific evaluation runs?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Follow these steps to access detailed logs for your evaluation runs:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">1. Check run's timestamp</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Note the Date in timestamp from your evaluation run for reference.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                    <Image 
                      src="/assets/troubleshoot_ui.png" 
                      alt="Run timestamp" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">2. Go to Datadog logs UI portal</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Access the <a 
                      href="https://nvitprod.datadoghq.com/logs?query=container_name%3Anvbot-evaluation%20-%22GET%20%2Fevaluation%20HTTP%2F1.1%22%20-%22WARNING%20%5Bddtrace.profiling.collector%22%20-%22WARNING%3Addtrace.profiling.collector%22%20-%22print_debug_info%22&agg_m=count&agg_m_source=base&agg_t=count&cols=service%2Chost&messageDisplay=inline&refresh_mode=sliding&saved-view-id=2674827&storage=hot&stream_sort=host%2Cdesc&view=spans&viz=stream&from_ts=1764732848286&to_ts=1765337648286&live=true" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >Datadog logs portal</a> and select roughly the date range (e.g., Dec. 10 - Dec. 11).
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Then search for your specific project name. For example, project "va_complete_evaluation":
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                    <Image 
                      src="/assets/troubleshoot_search_by_project_name.png" 
                      alt="Datadog logs search example" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">3. Click on the row, select "View in Context"</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    This will direct you to another tab with detailed context.
                  </p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                    <Image 
                      src="/assets/troubleshoot_view_context.png" 
                      alt="Datadog logs search example" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">4. Check logs</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Review the detailed logs for your evaluation run. 
                    <br />
                    <strong>Note:</strong> Filter out irrelevant logs by adding <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">-"200 OK"</code> to your search query.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                    <Image 
                      src="/assets/troubleshoot_dd_runlog.png" 
                      alt="Datadog logs search example" 
                      width={600} 
                      height={300} 
                      className="rounded border"
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What analytics UI are about?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                The analytics section provides comprehensive insights into your evaluation runs:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">Compact History View with aggregated metrics:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Browse all recent runs in a clean, filterable table. Each entry now includes accuracy, latency, and success summaries at a glance.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                    <Image 
                      src="/assets/howto_analysis.png" 
                      alt="Analytics dashboard with compact history view" 
                      width={600} 
                      height={400} 
                      className="rounded border"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">Visual Run Comparison:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Select multiple history IDs to compare side by side across key metrics like status distribution, quality, and latency.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                    <Image 
                      src="/assets/howto_comparision_detail.png" 
                      alt="Visual run comparison dashboard" 
                      width={600} 
                      height={400} 
                      className="rounded border"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">Excel Export:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Need to dive deeper? Export comparison results straight to Excel for further analysis.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                I would like to create Datadog dashboard for my project to monitor scheduled evaluation run metrics.
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can create comprehensive Datadog dashboards to monitor your evaluation metrics with rich filtering capabilities. Let's use Bugnemo as an example.
              </p>
              
              <div className="space-y-6">
                {/* Example Dashboard */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">📊 Example: Bugnemo Evaluation Dashboard</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Access the live dashboard to see how evaluation metrics are visualized:
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3">
                    <a 
                      href="https://nvitprod.datadoghq.com/dashboard/mda-rf5-icu/evaluation-service-bugnemo?fromUser=false&refresh_mode=sliding&tile_focus=2542275032039185&from_ts=1763420705234&to_ts=1766012705234&live=true" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Bugnemo Datadog Dashboard →
                    </a>
                  </div>
                </div>

                {/* Rich Tags Section */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">🏷️ Rich Tag Structure</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    We send evaluation metrics to Datadog with comprehensive tags that enable flexible charting and alerting:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">history-id</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">eval-id</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">project-name</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">bot-name</span>
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">dataset-id</span>
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">environment</span>
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">model</span>
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">creation_time</span>
                  </div>
                </div>

                {/* Configuration Example */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">⚙️ Dashboard Configuration Example</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Use tag combinations to create focused charts and alerts:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs font-mono mb-3">
                    <div className="text-green-600 dark:text-green-400 mb-2"># Filter Configuration</div>
                    <div className="text-gray-600 dark:text-gray-400 mb-2">
                      Filter by: <span className="text-blue-600 dark:text-blue-400">bot-name:bugnemo</span> AND <span className="text-blue-600 dark:text-blue-400">project-name:nvbugs_complete_evaluation</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Metric to visualize/alert on: <span className="text-orange-600 dark:text-orange-400">eval.quality_metrics.accuracy.mean</span>
                    </div>
                  </div>
                </div>

                {/* Video Guide */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">🎥 Setup Guide</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Watch the step-by-step recording for detailed dashboard creation instructions:
                  </p>
                  <a 
                    href="https://drive.google.com/file/d/1pi6PzlOjRcEBsud7Jna2S8EdHT0SIibY/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    Dashboard Creation Recording →
                  </a>
                </div>

                {/* Quick Tips */}
                <div>
                  <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">💡 Dashboard Tips</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Tag combinations:</strong> Mix and match tags to create specific views (e.g., environment + model)</li>
                    <li><strong>Key metrics:</strong> Focus on accuracy, latency, and success rates for comprehensive monitoring</li>
                    <li><strong>Time ranges:</strong> Set appropriate time windows for your scheduled evaluation frequency</li>
                    <li><strong>Alerts:</strong> Configure threshold-based alerts using the proper tag filters</li>
                    <li><strong>Templates:</strong> Use `Clone` in *Edit* as a template that can be easily duplicated for new project/alerts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-violet-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                This is amazing! What is the underneath architecture?
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-3">
                <Image 
                  src="/assets/architecture.png" 
                  alt="System architecture diagram" 
                  width={800} 
                  height={600} 
                  className="rounded border"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kudos to the amazing team: <strong>Aaditya Shukla</strong> and <strong>Tony Salim</strong>! 🎉
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Need additional help?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                For technical support or questions not covered here:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Refer to the <a href="https://confluence.nvidia.com/display/ITAppDev/Bot+Evaluation+Onboarding+Guide" className="text-blue-600 dark:text-blue-400 hover:underline">onboarding guide</a></li>
                <li>Contact the development team</li>
                <li>Check Datadog for system status</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
};

export default HelpPage;