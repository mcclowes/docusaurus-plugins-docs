// Vercel serverless function that serves the MCP endpoint from the build snapshot.
// docusaurus-plugin-mcp writes build/mcp/snapshot.json during `npm run build`;
// Vercel runs that build first, then traces this static import into the function
// bundle. Deployed at /api/mcp, exposed as /mcp via the rewrite in vercel.json.
// Rebuild (redeploy) to refresh the snapshot.
import { createNodeHandler } from 'docusaurus-plugin-mcp/server';
import snapshot from '../build/mcp/snapshot.json' with { type: 'json' };

export const config = { maxDuration: 60 };

export default createNodeHandler(snapshot, {
  name: 'docusaurus-plugins-docs',
  version: '0.1.0',
});
