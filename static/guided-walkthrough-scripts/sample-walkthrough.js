async function SampleWalkthrough(workflowCtx, portal) {
  return {
    "Guide": {
      name: "Introduction Guide",
      stepCallback: async () => {
        return workflowCtx.showContent(`## Introduction
This guide provides a step-by-step walkthrough for creating and validating a new user through endpoint requests.

Step 1: Create User
Use a Create User Request to initiate the user creation process. Provide the necessary user information, such as username, email, and password, in the request body. This step generates the user entity in the system.

Step 2: Validate Username
Execute a Validate Username Request to ensure the provided username meets all required criteria (e.g., length, format, or prohibited words). This step confirms the username's compliance with system rules.

Step 3: Validate for Duplicate User
Perform a Validate Duplicate User Request to check if the username or email already exists in the system. This prevents duplication and ensures the uniqueness of user accounts.

Step 4: Confirm Registration
Finalize the process with a Confirm Registration Request. Use the generated user ID or token from previous steps to activate the account, completing the user registration process.

This guide ensures a smooth and systematic approach to creating, validating, and confirming user registration.
  `);
      },
    },
    "Step 1": {
      name: "Create User",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to create a new user in the system.",
          endpointPermalink: "$e/PublicUser/CreateUser",
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            } else {
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            }
          },
        });
      },
    },
    "Step 2": {
      name: "Validate Username",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to validate the username for the new user.",
          endpointPermalink: "$e/Validations/ValidateUsername",
          args: {
            body: {
              value: stepState?.["Step 2"]?.requestData?.args?.body.username
            }
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200 || response.StatusCode == 204) {
              return true;
            } else {
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            }
          },
        });
      },
    },
    "Step 3": {
      name: "Validate for Duplicate User",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to validate if the user already exists in the system.",
          endpointPermalink: "$e/Validations/ValidateForDuplicateUser",
          args: {
            body: {
              firstname: stepState?.["Step 2"]?.requestData?.args?.body.firstname,
              lastname: stepState?.["Step 2"]?.requestData?.args?.body.lastname
            }
          },
          verify: (response, setError) => {
            if (response.StatusCode == 200 || response.StatusCode == 204) {
              return true;
            } else {
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            }
          },
        });
      },
    },
    "Step 4": {
      name: "Confirm Registration",
      stepCallback: async (stepState) => {
        await portal.setConfig((defaultConfig) => ({
          ...defaultConfig,
        }));
        return workflowCtx.showEndpoint({
          description:
            "This endpoint is used to confirm the registration of the new user.",
          endpointPermalink: "$e/DoubleOptIn/ConfirmRegistration",
          verify: (response, setError) => {
            if (response.StatusCode == 200) {
              return true;
            } else {
              setError(
                "API Call wasn't able to get a valid repsonse. Please try again."
              );
              return false;
            }
          },
        });
      },
    }
  };
}
