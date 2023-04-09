
## TinyAGI-Healer

TinyAGI-Healer is an open-source project designed to use the GPT API for automatic error detection and code fixing. 

When a function fails during execution, TinyAGI-Healer captures the source code and error details, then sends them to the GPT API. The API attempts to fix the function and sends the updated code back. 

TinyAGI-Healer then parses the returned code, extracts its attributes, and recreates the function during runtime. 

Finally, it attempts to re-execute the function with the fixed code provided by ChatGPT.

### Features
* Automatic error detection and reporting
* Utilizes the GPT API for intelligent code fixing
* Dynamic code parsing and function recreation during runtime

### Getting Started

#### Prerequisites
* An active GPT API key
* Node.js 14.x or higher
* npm or yarn package manager

#### Installation
Clone the repository:

``
git clone https://github.com/yourusername/tinyagi-healer.git
``

Navigate to the project directory:

``
cd tinyagi-healer
``

Install the required dependencies:

``
npm install
``

Set up your GPT API key and org as an environment variable:

``
export GPT_API_KEY=your_api_key_here
``

or create a .env file with.

``

### Usage


### Configuration
You can configure the behavior of TinyAGI-Healer by modifying the following settings:

max_retries: The maximum number of attempts to fix the code (default: 3).


### License
This project is licensed under the MIT License. See the LICENSE file for details.
