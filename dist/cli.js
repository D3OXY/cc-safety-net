import{a,s,ke,Ge,k,Ze,He,l,o,We,E,R,we,Qe,f,Ue,u,r,w,i,ne,n,g,ce,N,tt,nt,c,de,ue,rt,T,V,re,C,ot,M,v,Ce,F,d,q,Be,ze,I,S,P,pe,fe,Re,it,m,e,Pe,Se,Ve,qe,oe,xe,ie,_e,K,j,Ae,me,G,Ke,H,Y,J,se,Ye,Je,x,W,Te,De,Oe,L,Ne,Le,Me,h,t,Z,ge,y,b,_,st,$e,Fe,p,U}from"./chunks/index-pmd634p1.js";import{Q,B,je,D,O}from"./chunks/index-p5jk1vh1.js";var Hd=["-h","--help"];function xt(A,z){let X=Object.entries(A.booleans??{}),ee=Object.entries(A.values??{}),te=Object.entries(A.lists??{}),ae=Object.fromEntries(X.map(([Xe])=>[Xe,!1])),le={},ye=Object.fromEntries(te.map(([Xe])=>[Xe,[]])),he=[],ve=[],be=!1,Ie=-1;for(let[Xe,et]of z.entries()){if(Xe<=Ie)continue;if(et==="--"){he.push(...z.slice(Xe+1));break}if(Hd.includes(et)){be=!0;continue}let Ee=X.find(([,lt])=>lt.includes(et));if(Ee){ae[Ee[0]]=!0;continue}let at=ee.find(([,lt])=>lt.includes(et));if(at){let lt=z[Xe+1];if(lt===void 0||lt.startsWith("-")){ve.push(`${et} requires a value`);continue}le[at[0]]=lt,Ie=Xe+1;continue}let ct=te.find(([,lt])=>lt.includes(et));if(ct){let lt=z.slice(Xe+1),pt=lt.findIndex((gt)=>gt.startsWith("-")),mt=lt.slice(0,pt===-1?lt.length:pt);if(mt.length===0){ve.push(`${et} requires at least one value`);continue}ye[ct[0]]=[...ye[ct[0]]??[],...mt],Ie=Xe+mt.length;continue}if(et.startsWith("-")){ve.push(`Unknown option for ${A.label}: ${et}`);continue}if(A.positionals==="tail"){he.push(...z.slice(Xe));break}he.push(et)}if(A.positionals!=="list"&&A.positionals!=="tail")ve.push(...he.map((Xe)=>`Unexpected argument for ${A.label}: ${Xe}`));return{flags:ae,values:le,lists:ye,positionals:he,help:be,errors:ve}}function Ht(A){for(let z of A)console.error(z);return A.length>0}import{readdirSync as Jd,statSync as Oi,unlinkSync as Wd}from"node:fs";import{basename as Fi,dirname as Kd,isAbsolute as Yd,join as Zd,relative as Xd,resolve as Qd,sep as eu}from"node:path";var Ti=(A)=>{let z=Date.now()-new Date(A).getTime();if(!Number.isFinite(z))return"";let X=Math.floor(z/60000),ee=Math.floor(X/60),te=Math.floor(ee/24);if(te>0)return`${te}d ago`;if(ee>0)return`${ee}h ago`;if(X>0)return`${X}m ago`;return"just now"},Xr=(A)=>{let z=(A??"").trim().split(/\s+/).filter((te)=>te&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(te)),X=z[0]?.split("/").pop();if(!X)return null;let ee=z[1];return ee&&/^[a-z][a-z0-9-]*$/.test(ee)?`${X} ${ee}`:X};function $i(A){let z=(te)=>`${te.sessionId}
${Xr(te.segment||te.command)}`,X=A.filter((te)=>te.decision!=="allow"),ee=X.filter((te)=>te.sessionId).reduce((te,ae)=>te.set(z(ae),(te.get(z(ae))??0)+1),new Map);return new Set(X.filter((te)=>te.failureStage||(ee.get(z(te))??0)>=2))}import{existsSync as Ud,readdirSync as Gd,readFileSync as Bd}from"node:fs";import{join as qd}from"node:path";function Yt(A,z){try{return Gd(A,{withFileTypes:!0,encoding:"utf8"}).flatMap((X)=>{let ee=qd(A,X.name);if(X.isDirectory())return Yt(ee,z);if(X.name.endsWith(".jsonl"))return[ee];return[]})}catch{if(z&&Ud(A))z.count++;return[]}}var Vd=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function zd(A){if(!A||typeof A!=="object"||Array.isArray(A))return!1;let z=A;if(typeof z.ts!=="string"||typeof z.command!=="string")return!1;return Vd.every((X)=>z[X]===void 0||typeof z[X]==="string")}function un(A,z){try{return Bd(A,"utf-8").split(`
`).filter(Boolean).flatMap((X)=>{try{let ee=JSON.parse(X);if(!zd(ee)){if(z)z.count++;return[]}return[ee]}catch{if(z)z.count++;return[]}})}catch{if(z)z.count++;return[]}}function Ct(A){return Array.from(A,(z)=>{let X=z.charCodeAt(0);if(X<=31||X>=127&&X<=159)return`\\x${X.toString(16).padStart(2,"0")}`;return z}).join("")}function tu(A,z){let X=Q(A),ee=xt({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},z);if(Ht(ee.errors))return null;if(ee.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(ee.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let te=ee.values.limit===void 0?20:Ii(ee.values.limit);if(te===null)return console.error("--limit must be a positive number"),null;let ae=ee.values.since===void 0?Math.min(30,X):Ii(ee.values.since);if(ae===null||ae>X)return console.error(`--since must be a positive number of days no greater than ${X}`),null;let le={limit:te,limitExplicit:ee.values.limit!==void 0,since:ae,sinceExplicit:ee.values.since!==void 0,all:ee.flags.all,json:ee.flags.json,suspect:ee.flags.suspect,pruneLegacy:ee.flags.pruneLegacy,dryRun:ee.flags.dryRun,id:ee.values.id,agent:ee.values.agent,rule:ee.values.rule,session:ee.values.session,project:ee.values.project===void 0?void 0:Qd(ee.values.project)};if(le.id&&(le.agent!==void 0||le.rule!==void 0||le.session!==void 0||le.project!==void 0||le.suspect||le.sinceExplicit||le.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(le.pruneLegacy&&(le.id!==void 0||le.agent!==void 0||le.rule!==void 0||le.session!==void 0||le.project!==void 0||le.suspect||le.all||le.sinceExplicit||le.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(le.dryRun&&!le.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return le}async function ji(A,z,X={}){let ee=tu(A,z);if(!ee)return 1;let te=X.logsDir??D(A);if(ee.pruneLegacy)return nu(te,ee.json,ee.dryRun);if(!te)return console.log(ee.json?"[]":ee.id?`No retained audit log entry found for id ${Ct(ee.id)}.`:"No audit log entries found."),0;B(A,te);let ae={count:0},le=Yt(te,ae).flatMap((Ie)=>un(Ie,ae).map((Xe)=>({entry:Xe,file:Ie})));if(ae.count>0)console.error(`warning: ${ae.count} audit log ${ae.count===1?"source":"sources"} could not be read; these results are incomplete`);if(ee.id)return su(le,ee,X.timeZone);let ye=Date.now()-ee.since*24*60*60*1000,he=le.filter((Ie)=>au(Ie,ee,te,ye)),ve=ee.suspect?$i(he.map((Ie)=>Ie.entry)):null,be=(ve?he.filter((Ie)=>ve.has(Ie.entry)):he).sort((Ie,Xe)=>Date.parse(Xe.entry.ts)-Date.parse(Ie.entry.ts)).slice(0,ee.limit);if(ee.json)return console.log(JSON.stringify(be.map((Ie)=>Ie.entry),null,2)),0;if(be.length===0)return console.log("No audit log entries found."),0;for(let Ie of be)console.log(du(Ie.entry,X.timeZone));return 0}function nu(A,z,X){let ee=A?ou(A).map((ye)=>Zd(A,ye)):[];if(X)return ru(ee,z);let te=[],ae=0,le=0;for(let ye of ee){let he=Oi(ye,{throwIfNoEntry:!1})?.size??0,ve=iu(ye);if(ve){te.push(`${Fi(ye)}: ${ve}`);continue}ae++,le+=he}if(z)return console.log(JSON.stringify({removedFiles:ae,removedBytes:le,failedFiles:te.length})),te.length===0?0:1;console.log(ae===0&&te.length===0?"No legacy audit log files found.":`Removed ${ae} legacy audit log ${ae===1?"file":"files"} (${Ni(le)}).`);for(let ye of te)console.error(`Could not remove ${Ct(ye)}`);if(console.log("Nested v2 audit logs were not changed."),ae>0)console.log("This deletion cannot be undone.");return te.length===0?0:1}function ru(A,z){let X=A.reduce((ee,te)=>ee+(Oi(te,{throwIfNoEntry:!1})?.size??0),0);if(z)return console.log(JSON.stringify({dryRun:!0,files:A.length,bytes:X})),0;if(console.log(A.length===0?"No legacy audit log files found.":`Would remove ${A.length} legacy audit log ${A.length===1?"file":"files"} (${Ni(X)}).`),console.log("Nested v2 audit logs are not included."),A.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function ou(A){try{return Jd(A,{withFileTypes:!0}).filter((z)=>z.isFile()&&z.name.endsWith(".jsonl")).map((z)=>z.name)}catch{return[]}}function iu(A){try{return Wd(A),null}catch(z){return z instanceof Error?z.message:String(z)}}function Ni(A){let z=["B","KiB","MiB","GiB"],X=Math.min(Math.floor(Math.log2(Math.max(A,1))/10),z.length-1);return`${Math.round(A/1024**X*10)/10} ${z[X]}`}function su(A,z,X){let ee=A.filter((ae)=>ae.entry.id===z.id);if(ee.length>1)return console.error(`Multiple audit log entries found for id ${Ct(z.id??"")}.`),1;if(z.json)return console.log(JSON.stringify(ee.map((ae)=>ae.entry),null,2)),0;let te=ee[0];if(!te)return console.log(`No retained audit log entry found for id ${Ct(z.id??"")}.`),0;return console.log(uu(te.entry,X)),0}function au(A,z,X,ee){if(!z.all&&A.entry.decision==="allow")return!1;if(Date.parse(A.entry.ts)<ee)return!1;if(z.agent!==void 0&&A.entry.agent!==z.agent)return!1;if(z.rule!==void 0&&A.entry.ruleId!==z.rule)return!1;if(z.session!==void 0&&!lu(A,X,z.session))return!1;if(z.project!==void 0&&!cu(A.entry.cwd,z.project))return!1;return!0}function lu(A,z,X){if(A.entry.sessionId===X)return!0;return Kd(A.file)===z&&Fi(A.file,".jsonl")===X}function cu(A,z){if(!A)return!1;let X=Xd(z,A);return X!==".."&&!X.startsWith(`..${eu}`)&&!Yd(X)}function du(A,z){let X=Ct(A.id??"-"),ee=Ct(A.decision??"deny"),te=A.cwd?`  [${Ct(A.cwd)}]`:"",ae=A.segment||A.command,le=ae===A.command?"":"↳ ",ye=ae.length>50?`${ae.slice(0,50)}…`:ae;return`${X.padEnd(16)}  ${Ct(Mi(A.ts,z))}  ${ee.padEnd(5)}  ${Ct(A.agent??"-").padEnd(15)}  ${Ct(A.ruleId??"-").padEnd(20)}  ${le}${Ct(ye)}${te}`}function uu(A,z){let X=(te)=>Ct(te===void 0||te===null||te===""?"-":te),ee=A.shape?`${A.agent??"-"} (shape: ${A.shape})`:A.agent??"-";return[`id:        ${X(A.id)}`,`ts:        ${X(Mi(A.ts,z))}`,`decision:  ${X(A.decision)}`,`agent:     ${X(ee)}`,`level:     ${X(A.level)}`,`tool:      ${X(A.toolName)}`,`rule:      ${X(A.ruleId)}`,`intent:    ${X(A.intent)}`,`stage:     ${X(A.failureStage)}`,`error:     ${X(A.errorCode)}`,`session:   ${X(A.sessionId)}`,`cwd:       ${X(A.cwd)}`,`version:   ${X(A.v)}`,`truncated: ${X(A.truncated===!0?"yes":void 0)}`,`reason:    ${X(A.reason)}`,`command:   ${X(A.command)}`,`segment:   ${X(A.segment)}`].join(`
`)}function Mi(A,z){let X=new Date(A);if(Number.isNaN(X.getTime()))return A;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:z}).format(X)}function Ii(A){let z=Number(A);return Number.isFinite(z)&&z>0?z:null}var Hi={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var Ui={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var Gi={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var Kn=[{id:"antigravity-cli",displayName:"Antigravity CLI",doctorOrder:3,runtime:{order:1,flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:2,flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",doctorOrder:1,runtime:{order:2,displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{order:3,flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",doctorOrder:4,runtime:{order:3,flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{order:4,flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",doctorOrder:7,runtime:{order:6,flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{order:7,flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",doctorOrder:6,runtime:{order:5,flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{order:6,flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",doctorOrder:8,runtime:{order:7,flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{order:8,flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",doctorOrder:9,runtime:{order:8,flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{order:9,flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",doctorOrder:10,runtime:{order:9,flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{order:10,flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",doctorOrder:11,install:{order:11,flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",doctorOrder:12,install:{order:12,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",doctorOrder:13,install:{order:13,flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",doctorOrder:5,runtime:{order:4,flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{order:5,flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"amp",displayName:"Amp Code",doctorOrder:2,install:{order:1,flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}}],Yn=Kn.slice().sort((A,z)=>A.doctorOrder-z.doctorOrder).map((A)=>A.id),Cn=Kn.filter((A)=>("runtime"in A)).slice().sort((A,z)=>A.runtime.order-z.runtime.order).map((A)=>({id:A.id,displayName:"displayName"in A.runtime?A.runtime.displayName:A.displayName,flags:A.runtime.flags,legacyFlags:"legacyFlags"in A.runtime?A.runtime.legacyFlags:[],description:A.runtime.description,legacyTopLevelFlags:A.runtime.legacyTopLevelFlags})),Tt=Kn.slice().sort((A,z)=>A.install.order-z.install.order).map((A)=>({id:A.id,...A.install})).map(({order:A,...z})=>z),pu=Object.fromEntries(Kn.map((A)=>[A.id,A.displayName]));function bt(A){return pu[A]}var fu=Cn.map((A)=>({flags:A.flags.join(", "),description:A.description})),mu=Cn.flatMap((A)=>A.flags.map((z)=>`cc-safety-net hook ${z}`)),Bi={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...fu,{flags:"-h, --help",description:"Show this help"}],examples:mu};var qi={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...Tt.map((A)=>({flags:A.flag,description:`Install ${bt(A.id)} ${A.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...Tt.map((A)=>`cc-safety-net install ${A.flag}`)]},Vi={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...Tt.map((A)=>({flags:A.flag,description:`Uninstall ${bt(A.id)} ${A.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...Tt.map((A)=>`cc-safety-net uninstall ${A.flag}`)]},zi={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var Ji={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var Zn={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var Qr=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],eo=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],pn={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...Qr.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...eo,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var Wi={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var Ki={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var Xn=[Wi,Hi,Ji,Ui,pn,Zn,qi,zi,Vi,Bi,Gi,Ki];function gu(A){return A.aliases??[]}function Qn(A){let z=A.toLowerCase();return Xn.find((X)=>X.name.toLowerCase()===z||gu(X).some((ee)=>ee.toLowerCase()===z))}import{basename as yu}from"node:path";function er(A,z=7,X=D(A)){let ee=Date.now()-z*24*60*60*1000,te=[],ae=new Set,le=0,ye,he,ve,be;if(X)B(A,X);let Ie={count:0},Xe=X?Yt(X,Ie):[];for(let Ee of Xe)for(let at of un(Ee,Ie)){if(at.decision==="allow")continue;let ct=new Date(at.ts).getTime();if(ct>=ee){if(le++,ae.add(at.sessionId??yu(Ee,".jsonl")),he===void 0||ct<=he)ye=at.ts,he=ct;if(be===void 0||ct>be)ve=at.ts,be=ct;hu(te,at,ct)}}let et=te.map((Ee)=>({timestamp:Ee.ts,command:Ee.command,reason:Ee.reason,relativeTime:Ti(new Date(Ee.ts))}));return{totalBlocked:le,sessionCount:ae.size,recentEntries:et,oldestEntry:ye,newestEntry:ve,unreadable:Ie.count}}function hu(A,z,X){let ee=A.findIndex((te)=>X>new Date(te.ts).getTime());if(ee===-1){if(A.length<3)A.push(z);return}if(A.splice(ee,0,z),A.length>3)A.pop()}import{dirname as Du}from"node:path";import{dirname as vu,join as bu,resolve as Lu}from"node:path";var wu="config.json";function Rt(A,z,X,ee){g(ku(A),`${JSON.stringify(z,null,2)}
`,X,ee)}function ku(A){return typeof A==="string"?ne(A):A}function no(A){return{errors:oe(Cu(A),": "," "),ruleNames:new Set(_e(A).map((z)=>z.toLowerCase()))}}var xu="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",Yi="must match pattern (letters, numbers, hyphens, underscores)";function Cu(A){if(!Zi(A))return[e([],"Config must be an object")];return[...A.version===1?[]:[e(["version"],"must be 1")],...Su(A.rules)]}function Su(A){if(A===void 0)return[];if(!Array.isArray(A))return[e(["rules"],"must be an array")];return[...A.flatMap((z,X)=>Zi(z)?Ru(z,["rules",X]):[e(["rules",X],"must be an object")]),...Pe(A)]}function Ru(A,z){return[...to(A.name,[...z,"name"],"required string",c,xu),...to(A.command,[...z,"command"],"required string",S,Yi),...A.subcommand===void 0?[]:to(A.subcommand,[...z,"subcommand"],"must be a string if provided",S,Yi),...Pu(A.block_args,[...z,"block_args"]),...Eu(A.reason,[...z,"reason"]),...A.intent===void 0||xe(A.intent)?[]:[e([...z,"intent"],Se)]]}function to(A,z,X,ee,te){if(typeof A!=="string")return[e(z,X)];return ee.test(A)?[]:[e(z,te)]}function Pu(A,z){if(!Array.isArray(A))return[e(z,"required array")];if(A.length===0)return[e(z,"must have at least one element")];return A.flatMap((X,ee)=>{if(typeof X!=="string")return[e([...z,ee],"must be a string")];return X===""?[e([...z,ee],"must not be empty")]:[]})}function Eu(A,z){if(typeof A!=="string")return[e(z,"required string")];if(A==="")return[e(z,"must not be empty")];return A.length>P?[e(z,`must be at most ${P} characters`)]:[]}function Zi(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}function ro(A){let z=Xi(A);if(!z.ok)return z.result;return no(z.parsed)}function Xi(A){let z=[],X=new Set;try{let ee=typeof A==="string"?ne(A):A,te=n(ee);if(te===null)return z.push(`File not found: ${ee.path}`),{ok:!1,result:{errors:z,ruleNames:X}};if(!te.trim())return z.push("Config file is empty"),{ok:!1,result:{errors:z,ruleNames:X}};return{ok:!0,parsed:JSON.parse(te)}}catch(ee){if(ee instanceof r)return z.push(ee.message),{ok:!1,result:{errors:z,ruleNames:X}};let te=ee instanceof Error?ee.message:String(ee);return z.push(ee instanceof SyntaxError?"Invalid JSON":te),{ok:!1,result:{errors:z,ruleNames:X}}}}function Qi(A){return Lu(A,".safety-net.json")}function Jt(A){let z=Xi(A);if(!z.ok)return z.result;let X=Ve(z.parsed);return{errors:X.errors,ruleNames:X.sources}}function tr(A,z={}){return bu(vu(Ce(A,z)),wu)}function es(A,z,X){let ee;try{if(n(z)===null)return{path:A,exists:!1,valid:!1,ruleCount:0};ee=Jt(z),ee.errors.push(...j(A,X))}catch(te){if(!(te instanceof r))throw te;ee={errors:[te.message],ruleNames:new Set}}return{path:A,exists:!0,valid:ee.errors.length===0,ruleCount:ee.ruleNames.size,...ee.errors.length>0?{errors:ee.errors}:{}}}function Au(A,z){return{source:z,name:A.name,command:A.command,subcommand:A.subcommand,blockArgs:[...A.block_args],reason:A.reason}}function ts(A,z){let X=F(A),ee=M(z),te=Du(X),ae=K(A,{cwd:z,userConfigPath:X,projectConfigPath:ee,userConfigDir:te}),le=q(A,{cwd:z,userConfigPath:X,projectConfigPath:ee,userConfigDir:te}),ye=new Map(ae.rulebooks.flatMap((he)=>he.rules.map((ve)=>[ve,he.source])));return{userConfig:es(X,le.userConfigTarget,le.userScope),projectConfig:es(ee,le.projectConfigTarget,le.projectScope),effectiveRules:ae.rules.map((he)=>Au(he,ye.get(he.name)??"project"))}}var _u=[{flag:o.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:o.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:o.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:o.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:o.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:o.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:o.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:o.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"}];function ns(A){return[..._u.map((z)=>({name:z.flag.name,value:we(z.flag,A.env),isSet:Qe(z.flag,A.env),legacyName:z.flag.legacyName,legacyValue:z.flag.legacyName?A.env.get(z.flag.legacyName):void 0,legacyIsSet:z.flag.legacyName?A.env.get(z.flag.legacyName)!==void 0:void 0,description:z.description,defaultBehavior:z.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:A.env.get("CC_SAFETY_NET_HOME"),isSet:A.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var rs={error:0,warning:1,info:2},Tu=["policy","config","audit"];function $u(A){return A.map((z)=>{if(z==="ownership")return"is not owned by the current user";if(z==="permissions")return"has unsafe permissions";if(z==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var Iu=[{derive:(A)=>A.hooks.length>0&&A.hooks.every((z)=>!z.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(A)=>A.hooks.filter((z)=>z.inspectionStatus==="failed").map((z)=>{let X=bt(z.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${X} inspection failed`,detail:`Doctor could not verify the ${X} integration configuration.`,fixHint:`Correct the reported ${X} configuration error, then run \`cc-safety-net doctor\` again.`,integration:z.platform}})},{derive:(A)=>A.userConfig.exists&&!A.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:A.userConfig.path}]:[]},{derive:(A)=>A.projectConfig.exists&&!A.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:A.projectConfig.path}]:[]},{derive:(A)=>A.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${A.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(A)=>A.v2Leftovers&&A.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${A.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(A)=>{let z=A.environment.find((X)=>X.name==="CC_SAFETY_NET_AUDIT_SCOPE");return We(z?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Tu.map((A)=>({derive:(z)=>z.posture.directories.filter((X)=>X.kind===A&&X.status==="unsafe").map((X)=>({checkId:`posture.${A}-directory-unsafe`,severity:"error",title:`${A[0]?.toUpperCase()}${A.slice(1)} directory is unsafe`,detail:`The ${A} directory ${$u(X.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...X.path?{path:X.path}:{}}))})),{derive:(A)=>{let z=[...A.effectiveSafety.weakenedRuleOverrides].sort();return z.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${z.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${z.join(", ")}.`}]:[]}}];function os(A){return Iu.flatMap((z,X)=>z.derive(A).map((ee,te)=>({finding:ee,catalogOrder:X,occurrence:te}))).sort((z,X)=>rs[z.finding.severity]-rs[X.finding.severity]||z.catalogOrder-X.catalogOrder||z.occurrence-X.occurrence).map((z)=>z.finding)}function Ut(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var Ou=(A)=>Ut()?`\x1B[32m${A}\x1B[0m`:A,Fu=(A)=>Ut()?`\x1B[33m${A}\x1B[0m`:A,ju=(A)=>Ut()?`\x1B[34m${A}\x1B[0m`:A,Nu=(A)=>Ut()?`\x1B[36m${A}\x1B[0m`:A,Mu=(A)=>Ut()?`\x1B[31m${A}\x1B[0m`:A,Hu=(A)=>Ut()?`\x1B[2m${A}\x1B[0m`:A,Uu=(A)=>Ut()?`\x1B[1m${A}\x1B[0m`:A,dt={green:Ou,yellow:Fu,blue:ju,cyan:Nu,red:Mu,dim:Hu,bold:Uu},Gu="\x1B[0m",Bu=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function qu(A){let z=A;return()=>(z=(z*1664525+1013904223)%4294967296,z/4294967296)}function Vu(A){let z=[...Bu],X=qu(A);for(let ee=z.length-1;ee>0;ee--){let te=Math.floor(X()*(ee+1)),ae=z[ee];z[ee]=z[te],z[te]=ae}return z}function zu(A,z=0){if(!Ut())return"";let X=Vu(z);return`\x1B[38;5;${X[A%X.length]}m`}function is(A,z,X=0){if(!Ut())return`"${A}"`;return`${zu(z,X)}"${A}"${Gu}`}function nr(A){return A==="default"?"built-in default":`${A} policy`}var Ju=new RegExp("\x1B\\[[0-9;]*m","g"),oo=(A)=>A.replace(Ju,"").length;function Zt(A){let z=(A.headers??A.rows[0]??[]).map((le,ye)=>{let he=Math.max(...A.rows.map((ve)=>oo(ve[ye]??"")));return Math.max(oo(le),he)}),X=(le,ye)=>le+" ".repeat(Math.max(0,ye-oo(le))),ee=(le,ye)=>ye[0]+z.map((he)=>le.repeat(he+2)).join(ye[1])+ye[2],te=(le)=>`│ ${le.map((ye,he)=>X(ye,z[he]??0)).join(" │ ")} │`,ae=A.headers?[`   ${te(A.headers)}`,`   ${ee("─",["├","┼","┤"])}`]:[];return[`   ${ee("─",["┌","┬","┐"])}`,...ae,...A.rows.map((le)=>`   ${te(le)}`),`   ${ee("─",["└","┴","┘"])}`].join(`
`)}function ss(A){let z=[];z.push("Hook Integration"),z.push(Wu(A));let X=[],ee=[];for(let te of A){let ae=bt(te.platform);if(te.errors&&te.errors.length>0)for(let le of te.errors)if(te.configured)X.push({platform:ae,message:le});else ee.push({platform:ae,message:le})}for(let te of X)z.push(`   Warning (${te.platform}): ${te.message}`);for(let te of ee)z.push(dt.red(`   Error (${te.platform}): ${te.message}`));return z.join(`
`)}function Wu(A){let z=["Platform","Discovery","Configuration","Inspection"],X=A.map((ee)=>{let te=bt(ee.platform);if(ee.inspectionStatus==="not-inspected"){let he=dt.dim("Not inspected");return[te,he,he,he]}let ae=ee.detected?dt.green("Detected"):ee.inspectionStatus==="failed"?dt.red("Unknown"):dt.dim("Not detected"),le=ee.configured?dt.green("Configured"):ee.detected?dt.yellow("Not configured"):ee.inspectionStatus==="failed"?dt.red("Unknown"):dt.dim("Not applicable"),ye=ee.inspectionStatus==="verified"?dt.green("Verified"):ee.inspectionStatus==="failed"?dt.red("Failed"):dt.dim("Not applicable");return[te,ae,le,ye]});return Zt({headers:z,rows:X})}function as(A){let X=["Guard Engine Verification",`   Synthetic self-test: ${A.failed>0?dt.red(`${A.passed}/${A.total} FAIL`):dt.green(`${A.passed}/${A.total} passed`)}`],ee=A.results.filter((te)=>!te.passed);if(ee.length>0){X.push(""),X.push(dt.red("   Failures:"));for(let te of ee)X.push(dt.red(`   • ${te.description}`)),X.push(dt.red(`     expected ${te.expected}, got ${te.actual}`))}return X.join(`
`)}function Ku(A){if(A.length===0)return"   (no custom rules)";let z=["Source","Name","Command","Block Args"],X=A.map((ee)=>[ee.source,ee.name,ee.subcommand?`${ee.command} ${ee.subcommand}`:ee.command,ee.blockArgs.join(", ")]);return Zt({headers:z,rows:X})}function ls(A){let z=[];if(z.push("Configuration"),z.push(Yu(A.userConfig,A.projectConfig)),z.push(""),A.effectiveRules.length>0)z.push(`   Effective rules (${A.effectiveRules.length} total):`),z.push(Ku(A.effectiveRules));else z.push("   Effective rules: (none - using built-in rules only)");return z.join(`
`)}function Yu(A,z){let X=["Scope","Status"],ee=(ae)=>{if(!ae.exists)return dt.dim("N/A");if(!ae.valid)return dt.red(`Invalid (${ae.errors?.[0]??"unknown error"})`);return dt.green("Configured")},te=[["User",ee(A)],["Project",ee(z)]];return Zt({headers:X,rows:te})}function cs(A){let z=[];return z.push("Environment"),z.push(Zu(A)),z.join(`
`)}function ds(A){let z=A.effectiveSafety.policyScopes,X=["Effective Safety",`   Selected preset: ${A.effectiveSafety.selectedPreset}${z?` (${nr(z.levelScope)})`:""}`,`   Effective: ${A.effectiveSafety.level}`],ee=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[te,ae]of ee){let le=A.effectiveSafety.capabilities[te],ye=le.enabled?dt.green("ON"):dt.dim("OFF"),he=le.sources.length>0?` (${le.sources.join(", ")})`:"";X.push(`   ${ae}: ${ye} via ${le.source}${he}`)}if(z&&z.weakenings.length>0){X.push("   Project policy deltas:");for(let te of z.weakenings)X.push(`      ${te}`)}X.push(`   Stored rule customizations: ${A.effectiveSafety.ruleCounts.stored}`),X.push(`   Effective rule customizations: ${A.effectiveSafety.ruleCounts.effective}`);for(let[te,ae]of Object.entries(A.effectiveSafety.ruleOverrides))X.push(`   ${te}: ${ae}`);return X.join(`
`)}function us(A){let z=["Findings"];if(A.length===0)return z.push("   No findings from inspected doctor facts."),z.join(`
`);for(let X of A){let ee=`[${X.severity.toUpperCase()}] ${X.checkId}: ${Ct(X.title)}`,te=X.severity==="error"?dt.red:X.severity==="warning"?dt.yellow:dt.blue;if(z.push(`   ${te(ee)}`),z.push(`      ${Ct(X.detail)}`),X.path)z.push(`      Path: ${Ct(X.path)}`);if(X.fixHint)z.push(`      Fix: ${Ct(X.fixHint)}`)}return z.join(`
`)}function Zu(A){let z=["Variable","Status","Legacy"],X=A.map((ee)=>{let te=ee.isSet?dt.green("✓"):dt.dim("✗"),ae=ee.legacyName&&ee.legacyIsSet?`${ee.legacyName} ${dt.green("✓")}`:ee.legacyName??"";return[ee.name,te,ae]});return Zt({headers:z,rows:X})}function ps(A){let z=[];if(A.totalBlocked===0)z.push("Recent Activity"),z.push("   No blocked commands in the last 7 days"),z.push("   Tip: This is normal for new installations");else z.push(`Recent Activity · last 7 days (${A.totalBlocked} blocked / ${A.sessionCount} sessions)`),z.push(Xu(A.recentEntries));if(A.unreadable>0)z.push(`   Warning: ${A.unreadable} audit log ${A.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return z.join(`
`)}function Xu(A){let z=["Time","Command"],X=A.map((ee)=>{let te=Ct(ee.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),ae=te.length>40?`${te.slice(0,37)}...`:te;return[ee.relativeTime,ae]});return Zt({headers:z,rows:X})}function fs(A){let z=[];if(z.push("Update Check"),A.latestVersion===null&&!A.error)return z.push(rr([["Status",dt.dim("Skipped")],["Installed",A.currentVersion]])),z.join(`
`);if(A.error)return z.push(rr([["Status",`${dt.yellow("⚠")} Error`],["Installed",A.currentVersion],["Error",dt.dim(A.error)]])),z.join(`
`);if(A.updateAvailable)return z.push(rr([["Status",`${dt.yellow("⚠")} Update Available`],["Current",A.currentVersion],["Latest",dt.green(A.latestVersion??"")]])),z.push(""),z.push("   Run: bunx cc-safety-net@latest doctor"),z.push("   Or:  npx cc-safety-net@latest doctor"),z.join(`
`);return z.push(rr([["Status",`${dt.green("✓")} Up to date`],["Version",A.currentVersion]])),z.join(`
`)}function rr(A){return Zt({rows:A})}function ms(A){let z=[];return z.push("System Info"),z.push(Qu(A)),z.join(`
`)}function Qu(A){let z=["Component","Version"],X=(ae)=>{if(ae===null)return dt.dim("not found");return ae},te=[{label:"cc-safety-net",value:A.version},...Yn.map((ae)=>({label:bt(ae),value:A.versions[ae]??null})),{label:"Node.js",value:A.nodeVersion},{label:"npm",value:A.npmVersion},{label:"Bun",value:A.bunVersion},{label:"Platform",value:A.platform}].map((ae)=>[ae.label,X(ae.value)]);return Zt({headers:z,rows:te})}function gs(A){if(A.findings.length===0)return dt.green(`
No findings from inspected doctor facts.`);let z={error:A.findings.filter((ae)=>ae.severity==="error").length,warning:A.findings.filter((ae)=>ae.severity==="warning").length,info:A.findings.filter((ae)=>ae.severity==="info").length},X=["error","warning","info"].filter((ae)=>z[ae]>0).map((ae)=>`${z[ae]} ${ae}`),ee=A.findings.length===1?"finding":"findings",te=`
${A.findings.length} ${ee}: ${X.join(", ")}.`;if(z.error>0)return dt.red(te);if(z.warning>0)return dt.yellow(te);return dt.blue(te)}import{lstatSync as ep}from"node:fs";import{dirname as io}from"node:path";function so(A,z){try{let X=ep(z);if(X.isSymbolicLink())return{kind:A,path:z,status:"unsafe",issues:["symlink"]};if(!X.isDirectory())return{kind:A,path:z,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:A,path:z,status:"unknown",issues:[]};let ee=[...X.uid!==process.getuid()?["ownership"]:[],...(X.mode&18)!==0?["permissions"]:[]];return{kind:A,path:z,status:ee.length>0?"unsafe":"safe",issues:ee}}catch(X){if(typeof X==="object"&&X!==null&&"code"in X&&X.code==="ENOENT")return{kind:A,path:z,status:"not-applicable",issues:[]};return{kind:A,path:z,status:"unknown",issues:[]}}}function ys(A,z){let X=D(A);return{directories:[so("policy",io(io(z))),so("config",io(z)),...X?[so("audit",X)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as tp}from"node:child_process";import{existsSync as hs}from"node:fs";import{delimiter as np,extname as rp,join as op}from"node:path";import{stripVTControlCharacters as vs}from"node:util";var Ls="2.4.1",ip=5000,sp="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function wt(){return Ls}function ao(A,z){let X=A[z];if(X)return X;let ee=Object.keys(A).find((te)=>te.toLowerCase()===z.toLowerCase()&&!!A[te]);return ee?A[ee]:X}function ap(A){return(ao(A,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((z)=>z.length>0)}function lp(A,z){let X=rp(A)?[A]:[...ap(z).map((ee)=>`${A}${ee}`),A];if(A.includes("/")||A.includes("\\"))return X.find((ee)=>hs(ee))??A;return(ao(z,"PATH")??"").split(np).flatMap((ee)=>X.map((te)=>op(ee,te))).find((ee)=>hs(ee))??A}function bs(A){if(!/[\s"&|<>^]/.test(A))return A;return`"${A.replace(/"/g,'""')}"`}function Xt(A,z){let[X,...ee]=A,te=z[sp]==="win32"?"win32":process.platform;if(!X||te!=="win32")return{cmd:X??"",args:ee};let ae=lp(X,z);if(!/\.(?:bat|cmd)$/i.test(ae))return{cmd:ae,args:ee};return{cmd:ao(z,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",bs(ae),...ee.map(bs)].join(" ")]}}var fn=async(A,z=ip)=>{let X=await cp(A,{timeoutMs:z});if(X.code!==0)return null;return vs(X.stdout).trim()||vs(X.stderr).trim()||null};function cp(A,z){let[X,...ee]=A;if(!X)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((te)=>{try{let ae=Xt([X,...ee],process.env),le=tp(ae.cmd,ae.args,{stdio:["ignore","pipe","pipe"]}),ye=!1,he="",ve="";le.stdout.on("data",(Xe)=>{he+=Xe.toString()}),le.stderr.on("data",(Xe)=>{ve+=Xe.toString()});let be=(Xe)=>{if(ye)return;ye=!0,clearTimeout(Ie),te(Xe)},Ie=setTimeout(()=>{le.kill(),be({code:null,stdout:he,stderr:ve})},z.timeoutMs);le.on("close",(Xe)=>{be({code:Xe,stdout:he,stderr:ve})}),le.on("error",()=>{be({code:null,stdout:he,stderr:ve})})}catch{te({code:null,stdout:"",stderr:""})}})}function or(A){if(!A)return null;let z=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(A);if(z)return z[1]??null;let X=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(A);if(X)return X[1]??null;return A.split(`
`)[0]?.trim()||null}async function ir(A=fn){let[z,X,ee,te,ae,le]=await Promise.all([Promise.all(Tt.map(async(ye)=>[ye.id,or(await A([...ye.probeCommand]))])),A(["codex","plugin","list"],30000),A(["amp","plugins","list"],30000),A(["node","--version"]),A(["npm","--version"]),A(["bun","--version"])]);return{version:Ls,versions:Object.fromEntries(z),codexPluginListOutput:X,ampPluginListOutput:ee,nodeVersion:or(te),npmVersion:or(ae),bunVersion:or(le),platform:`${process.platform} ${process.arch}`}}function lo(A,z){if(z==="dev")return!1;let X=A.split(".").map(Number),ee=z.split(".").map(Number),[te=0,ae=0,le=0]=X,[ye=0,he=0,ve=0]=ee;if(te!==ye)return te>ye;if(ae!==he)return ae>he;return le>ve}async function Wt(){let A=wt(),z=new AbortController,X=setTimeout(()=>z.abort(),3000);try{let ee=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:z.signal});if(!ee.ok)return{currentVersion:A,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${ee.status}`};let te=await ee.json(),ae=lo(te.version,A);return{currentVersion:A,latestVersion:te.version,updateAvailable:ae}}catch(ee){return{currentVersion:A,latestVersion:null,updateAvailable:!1,error:ee instanceof Error?ee.message:"Network error"}}finally{clearTimeout(X)}}import*as Es from"node:readline";var Cs=(A)=>`\x1B[${A}B`,dp=(A)=>`\x1B[${A}A`;var ws=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function up(A){return new Promise((z)=>setTimeout(z,A))}function pp(A,z,X){if(!X)return z(A);if(X.aborted)return Promise.resolve();return new Promise((ee,te)=>{let ae=()=>X.removeEventListener("abort",le),le=()=>{ae(),ee()};X.addEventListener("abort",le,{once:!0}),z(A).then(()=>{ae(),ee()},(ye)=>{ae(),te(ye)})})}function sr(A){return Math.max(0,Math.min(1,A))}function mn(A){return Math.max(0,Math.min(255,Math.round(A)))}function co(A){return A<=0.0031308?12.92*A:1.055*A**0.4166666666666667-0.055}function fp(A,z,X){let ee=X*Math.PI/180,te=z*Math.cos(ee),ae=z*Math.sin(ee),le=(A+0.3963377774*te+0.2158037573*ae)**3,ye=(A-0.1055613458*te-0.0638541728*ae)**3,he=(A-0.0894841775*te-1.291485548*ae)**3;return{blue:mn(co(sr(-0.0041960863*le-0.7034186147*ye+1.707614701*he))*255),green:mn(co(sr(-1.2684380046*le+2.6097574011*ye-0.3413193965*he))*255),red:mn(co(sr(4.0767416621*le-3.3077115913*ye+0.2309699292*he))*255)}}function uo(A,z){let X=(z*A*180/Math.PI%360+360)%360;return fp(0.72,0.15,X)}function Ss(A,z=0.1){let X=uo(z,A);return`\x1B[38;2;${X.red};${X.green};${X.blue}m`}function mp(A,z){return{blue:mn(A.blue+(255-A.blue)*z),green:mn(A.green+(255-A.green)*z),red:mn(A.red+(255-A.red)*z)}}function Rs(A,z,X){let ee=Math.imul(A+2654435769,2246822507)^Math.imul(z+3266489909,668265263)^Math.imul(X+374761393,2654435761),te=ee^ee>>>15,ae=Math.imul(te,739982445),le=ae^ae>>>12,ye=Math.imul(le,695872825);return((ye^ye>>>15)>>>0)/4294967296}function gp(A,z,X){let ee=Math.floor(Rs(A,z,X)*ws.length);return ws[ee]??"░"}function ks(A){let z=sr(A);return z*z*z*(z*(z*6-15)+10)}function yp(A){if(A.length===0)return"";let z=[],X=!1,ee="";for(let te of A){let ae=`${te.red};${te.green};${te.blue}`;if(te.bold!==X)z.push(te.bold?"\x1B[1m":"\x1B[22m"),X=te.bold;if(ae!==ee)z.push(`\x1B[38;2;${ae}m`),ee=ae;z.push(te.character)}return`${z.join("")}\x1B[22m\x1B[39m`}function hp(A,z,X,ee,te){return A.map((ae,le)=>({...uo(X,ee+z+le/te),bold:!1,character:ae}))}function vp(A,z,X,ee,te,ae,le,ye){let he=Math.max(1,ee*0.75),ve=Math.min(1,X/he),be=te*ks(ve),Ie=Math.max(0,(X-he)/Math.max(1,ee-he)),Xe=(1-ks(X/ee))*ye*2,et=0.35*Math.max(0,1-Ie*2),Ee=ve>=1,at=Math.min(A.length,Math.ceil(be+2+1));return A.slice(0,at).map((ct,lt)=>{let pt=uo(ae,le+z+lt/ye+Xe),mt=lt+Rs(z,lt,7919)*2-1;if(mt>be+2)return{...pt,bold:!1,character:" "};let gt=be-mt,ut=0.8*Math.exp(-(gt*gt)/12.5),vt=Math.min(0.9,ut+et),Dt=!Ee&&mt>be-4;return{...mp(pt,vt),bold:vt>0.3,character:Dt?gp(z,lt,X):ct}})}function xs(A){return`\x1B[?2026h${A.map((z,X)=>`\x1B8${X>0?Cs(X):""}${yp(z)}`).join("")}\x1B[?2026l`}async function po(A,z={}){if(!A)return;let X=z.output??process.stdout,ee=z.sleep??up,te=z.seed??0,ae=A.split(`
`).map((be)=>Array.from(be)),le=Math.max(...ae.map((be)=>be.length)),ye=12000*ae.filter((be)=>be.length>0).length/40,he=le>0?Math.max(1,Math.ceil(ye/16.666666666666668)):0,ve=he>0?ye/he:0;X.write(`\x1B[?25l${ae.length>1?`${`
`.repeat(ae.length-1)}${dp(ae.length-1)}`:""}\x1B7`);try{for(let be=1;be<=he;be+=1){if(z.signal?.aborted)break;X.write(xs(ae.map((Ie,Xe)=>vp(Ie,Xe,be,he,le,0.1,te,3)))),await pp(ve,ee,z.signal)}}finally{if(X.write(xs(ae.map((be,Ie)=>hp(be,Ie,0.1,te,3)))),X.write("\x1B8"),ae.length>1)X.write(Cs(ae.length-1));X.write(`
\x1B[0m\x1B[?25h`)}}var Ps=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function bp(A){return Boolean(A.isTTY)}async function Sn(A={}){let z=A.output??process.stdout;if(!bp(z))return;let X=A.input??process.stdin,ee={output:z,seed:A.seed??Math.random()*8192,sleep:A.sleep};if(!X.isTTY||typeof X.setRawMode!=="function"){await po(Ps,ee);return}let te=new AbortController,ae=X.readableFlowing===!0,le=X.isRaw===!0,ye=!1,he=(ve,be)=>{if(be.ctrl&&be.name==="c")ye=!0;if(ye||be.name==="return"||be.name==="enter")te.abort()};Es.emitKeypressEvents(X),X.on("keypress",he),X.setRawMode(!0),X.resume();try{await po(Ps,{...ee,signal:te.signal})}finally{if(X.off("keypress",he),X.setRawMode(le),!ae)X.pause()}if(!ye)return;if(A.onInterrupt){A.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as Cp}from"node:crypto";import{existsSync as _s}from"node:fs";import{dirname as ar,join as Ts}from"node:path";import{dirname as Ds,join as Lp,resolve as wp}from"node:path";var kp="rule.lock";function xp(A){return Lp(Ds(A),kp)}function As(A={}){return wp(A.cwd??process.cwd(),".safety-net.json")}function Pt(A,z){let X=z.global?z.userConfigPath??F(A,z):z.projectConfigPath??M(z.cwd??process.cwd()),ee=z.global?Be(A,z):ze(X,z.cwd??process.cwd()),te=xp(X);return{configDir:Ds(X),configPath:X,lockPath:te,filesystemScope:ee,configTarget:i(ee,X),lockTarget:i(ee,te)}}var Sp="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",Rp="cache",Pp="rulebooks";function $s(A,z={}){let X=Pt(A,z),ee=i(X.filesystemScope,Os(X.configDir)),te=n(X.lockTarget);if(console.log(Sp),te===null&&!_s(ee.path))return console.log(`No v2 lock or cache leftovers found in ${ar(X.configDir)}; nothing to migrate.`),0;let ae=Tp(te),le=m(X.configTarget);if(!le.config&&(n(X.configTarget)!==null||ae.size>0))return console.error(`Cannot migrate: the rules config in ${ar(X.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let ye=le.config?.rules??[];for(let he of ye.flatMap((ve)=>Ep(ve,ae,X,ee,z.global===!0)))console.log(he);return N(X.lockTarget),tt(ee),console.log(`Removed the v2 lock and cache under ${ar(X.configDir)}.`),0}function Is(A,z){return[...new Set([{cwd:z},{cwd:z,global:!0}].flatMap((X)=>{let ee=Pt(A,X);return[ee.lockPath,Os(ee.configDir)]}))].filter((X)=>_s(X))}function Ep(A,z,X,ee,te){if(!C(A))return[];let ae=T(A).name,le=i(X.filesystemScope,I(X.configDir,ae)),ye=n(le);if(ye!==null&&Dp(ye,ae))return[];let he=z.get(A),ve=he?Ap(he,ae,ee.path,X.filesystemScope):null;if(ve===null)return[`Could not migrate ${A} from the v2 cache. Run \`cc-safety-net rule update ${A}${te?" --global":""}\` to vendor it.`];if(g(le,ve),ye!==null)return[`Restored ${A} from the v2 cache over an invalid file.`];return[`Vendored ${A} from the v2 cache.`]}function Dp(A,z){let X=me(A);return!("problem"in X)&&X.rulebook.name===z}function Ap(A,z,X,ee){let te=Ts(X,Pp,`${_p(A)}--${A.digest.replace("sha256:","").slice(0,12)}`,de),ae=n(i(ee,te));if(ae===null||Op(ae)!==A.digest)return null;let le=me(ae);if("problem"in le||le.rulebook.name!==z)return null;return ae}function Os(A){return Ts(ar(A),Rp)}function _p(A){return([A.owner,A.repo,A.display_ref,A.name].every((ee)=>typeof ee==="string"&&ee!=="")?`${A.owner}/${A.repo}#${A.display_ref}/${A.name}`:A.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Tp(A){let z=A===null?null:Ip(A),X=Fs(z)&&Array.isArray(z.rulebooks)?z.rulebooks:[];return new Map(X.filter($p).map((ee)=>[ee.spec,ee]))}function $p(A){return Fs(A)&&typeof A.spec==="string"&&typeof A.digest==="string"}function Fs(A){return!!A&&typeof A==="object"}function Ip(A){try{return JSON.parse(A)}catch{return null}}function Op(A){return`sha256:${Cp("sha256").update(A).digest("hex")}`}var js="\r\x1B[2K",Fp="\x1B[?25l",jp="\x1B[39m",Np="\x1B[?25h",Mp=100,Hp=0.55,Up=80,Ns=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Gp(A){return new Promise((z)=>setTimeout(z,A))}async function lr(A,z={}){let X=z.output??process.stdout;if(!X.isTTY)return A;let ee=z.sleep??Gp,te=!1,ae=A.then((ye)=>(te=!0,ye),(ye)=>{throw te=!0,ye});if(await Promise.race([ae.then(()=>!0),ee(Mp).then(()=>!1)]))return ae;X.write(Fp);try{for(let ye=0;!te;ye+=1)X.write(`${js}${Ss(ye*Hp)}${Ns[ye%Ns.length]}${jp} ${z.loadingMessage??"Loading…"}`),await Promise.race([ae,ee(Up)]);return await ae}finally{X.write(`${js}${Np}`)}}async function Rn(A,z,X,ee={}){let te=z();if(A)await X();if(A&&te.ready)await lr(te.ready,ee);return te.finish()}import{stripVTControlCharacters as Bp}from"node:util";var cr="amp plugins list",qp=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function Ms(A){if(!A.ampPluginListOutput)return{platform:"amp",status:"n/a"};let z=Bp(A.ampPluginListOutput).split(`
`).map((X)=>qp.exec(X)?.[1]).find((X)=>X!==void 0);if(!z)return{platform:"amp",status:"n/a"};if(z!=="active")return{platform:"amp",status:"disabled",method:cr,configPath:cr,errors:[`Amp personal plugin cc-safety-net is ${z}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:cr,configPath:cr}}import{existsSync as Jp,readFileSync as Wp}from"node:fs";import{isAbsolute as K1,join as zp,relative as Y1}from"node:path";function Pn(A){return zp(A,".gemini","config","hooks.json")}var Kp=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function Yp(A){if(!A||typeof A!=="object"||Array.isArray(A))return[];return Object.values(A).flatMap((z)=>{if(!z||typeof z!=="object"||Array.isArray(z))return[];let X=z,ee=X.PreToolUse;if(!Array.isArray(ee))return[];return ee.flatMap((te)=>{if(!te||typeof te!=="object"||Array.isArray(te))return[];let ae=te.hooks;if(!Array.isArray(ae))return[];return ae.flatMap((le)=>{if(!le||typeof le!=="object"||Array.isArray(le))return[];let ye=le.command;if(typeof ye!=="string"||!Kp.test(ye))return[];return[{command:ye,enabled:X.enabled!==!1}]})})})}function Hs(A){let z=Pn(A.environment.home);if(!Jp(z))return{platform:"antigravity-cli",status:"n/a",configPath:z};let X;try{X=Yp(JSON.parse(Wp(z,"utf-8")))}catch(ee){return{platform:"antigravity-cli",status:"n/a",configPath:z,errors:[`Failed to parse Antigravity hooks config ${z}: ${ee instanceof Error?ee.message:String(ee)}`]}}if(X.some((ee)=>ee.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:z};if(X.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:z};return{platform:"antigravity-cli",status:"n/a",configPath:z}}import{join as Us}from"node:path";import{existsSync as Zp,lstatSync as Xp,readFileSync as Qp}from"node:fs";function Ot(A,z=(X)=>X){if(!Zp(A))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(z(Qp(A,"utf-8")))}}catch{return{kind:"unreadable"}}}function Lt(A){try{return Xp(A)}catch{return}}function dr(A,z){let X=Lt(z);if(!X)return{platform:A,status:"n/a",configPath:z};if(!X.isSymbolicLink()&&X.isDirectory())return;return{platform:A,status:"n/a",configPath:z,errors:[`${z} is a symlink or not a directory; move or remove it before installing`]}}function ft(A,z){return typeof A==="object"&&A!==null?A[z]:void 0}var fo="cc-safety-net@cc-marketplace";function Gs(A){return Us(A.home,".claude","plugins","installed_plugins.json")}function Bs(A,z){let X=ft(ft(A,"plugins"),z);return Array.isArray(X)&&X.length>0}function ur(A,z){let X=Ot(Gs(A));return X.kind==="ok"&&Bs(X.value,z)}function mo(A){let z=Gs(A),X=Ot(z);if(X.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(X.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!Bs(X.value,fo))return{platform:"claude-code",status:"n/a"};let ee=Us(A.home,".claude","settings.json"),te=Ot(ee);if(te.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(te.kind==="ok"&&ft(ft(te.value,"enabledPlugins"),fo)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:ee,errors:[`${fo} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:z}}function qs(A){return mo(A.environment)}function Vs(A){if(!A.codexPluginListOutput)return{platform:"codex",status:"n/a"};let z=A.codexPluginListOutput.split(`
`).find((X)=>X.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!z)return{platform:"codex",status:"n/a"};if(!z.includes("installed,"))return{platform:"codex",status:"n/a"};if(!z.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list"}}import{existsSync as hr,readdirSync as e2,readFileSync as t2}from"node:fs";import{join as St}from"node:path";function At(A){let z="",X=0,ee=!1,te=!1,ae=-1;while(X<A.length){let le=A[X],ye=A[X+1];if(te){z+=le,te=!1,X++;continue}if(le==='"'&&!ee){ee=!0,ae=-1,z+=le,X++;continue}if(le==='"'&&ee){ee=!1,z+=le,X++;continue}if(le==="\\"&&ee){te=!0,z+=le,X++;continue}if(ee){z+=le,X++;continue}if(le==="/"&&ye==="/"){while(X<A.length&&A[X]!==`
`)X++;continue}if(le==="/"&&ye==="*"){X+=2;while(X<A.length-1){if(A[X]==="*"&&A[X+1]==="/"){X+=2;break}X++}continue}if(le===","){ae=z.length,z+=le,X++;continue}if(le==="}"||le==="]"){if(ae!==-1){let he=z.slice(ae+1);if(/^\s*$/.test(he))z=z.slice(0,ae)+he}ae=-1,z+=le,X++;continue}if(!/\s/.test(le))ae=-1;z+=le,X++}return z}function go(A,z,X){let ee=z+1,te=!1;while(ee<A.length){if(te){te=!1,ee++;continue}if(A[ee]==="\\"){te=!0,ee++;continue}if(A[ee]==='"')return ee+1;ee++}throw Error(X)}function yo(A,z,X){let ee=A[z],te=ee==="["?"]":"}",ae=0,le=z;while(le<A.length){let ye=X.skipComment?.(A,le)??le;if(ye!==le){le=ye;continue}if(A[le]==='"'){le=go(A,le,X.stringError);continue}if(A[le]===ee)ae++;if(A[le]===te){if(ae--,ae===0)return le}le++}throw Error(X.bracketError)}function Js(A,z){let X=A.lastIndexOf(`
`,z)+1;return/^[ \t]*/.exec(A.slice(X))?.[0]??""}function fr(A,z){let X=z.end+(/^\s*/.exec(A.slice(z.end))?.[0].length??0);if(A[X]===","){let le=A[X+1]===`
`?X+2:X+1;return`${A.slice(0,z.start)}${A.slice(le)}`}let ee=A.slice(0,z.start).search(/\s*$/)-1;if(A[ee]!==",")return`${A.slice(0,z.start)}${A.slice(z.end)}`;let te=A.lastIndexOf(`
`,ee-1),ae=te!==-1&&/^\s*$/.test(A.slice(te+1,ee))?te:ee;return`${A.slice(0,ae)}${A.slice(z.end)}`}function pr(A,z){if(A.startsWith("//",z)){let X=A.indexOf(`
`,z+2);return X===-1?A.length:X+1}if(A.startsWith("/*",z)){let X=A.indexOf("*/",z+2);return X===-1?A.length:X+2}return z}function zs(A,z){let X=z;while(X<A.length){if(/\s/.test(A[X]??"")){X++;continue}let ee=pr(A,X);if(ee===X)return X;X=ee}return X}function Ws(A,z,X){let ee=0,te=0;while(te<A.length){let ae=pr(A,te);if(ae!==te){te=ae;continue}if(A[te]==='"'){let le=go(A,te,X.stringError);if(ee===1&&JSON.parse(A.slice(te,le))===z){let ye=zs(A,le),he=zs(A,ye+1);if(A[ye]===":"&&A[he]==="[")return{start:he,end:yo(A,he,{skipComment:pr,...X})}}te=le;continue}if(A[te]==="{"||A[te]==="[")ee++;if(A[te]==="}"||A[te]==="]")ee--;te++}return}function Ks(A,z,X){let ee=[],te=z.start+1;while(te<z.end){let ae=pr(A,te);if(ae!==te){te=ae;continue}if(A[te]==='"'){let le=go(A,te,X),ye=JSON.parse(A.slice(te,le));if(typeof ye==="string")ee.push({range:{start:te,end:le},value:ye});te=le;continue}te++}return ee}var Ft="cc-safety-net@cc-marketplace",mr=["cc-marketplace","cc-safety-net"],Ys=["_direct","copilot-safety-net"],Zs=["cc-marketplace","safety-net"],Xs="safety-net@cc-marketplace";function gr(A,z){let X=z.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${X}([^a-z0-9-]|$)`,"m").test(A??"")}function Qs(A){return gr(A,"cc-safety-net@cc-marketplace")}function ea(A){return gr(A,"cc-marketplace")}function ta(A){return gr(A,"copilot-safety-net")}function na(A){return gr(A,"safety-net@cc-marketplace")}function ho(A){if(!A?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(A)}function oa(A,z){if(!A)return null;let X=A.match(/(\d+)\.(\d+)\.(\d+)/);if(!X)return null;let ee=[Number(X[1]),Number(X[2]),Number(X[3])];for(let te=0;te<z.length;te++){let ae=ee[te]??0,le=z[te]??0;if(ae!==le)return ae>le}return!0}function n2(A){return oa(A,[0,0,422])}function r2(A){return oa(A,[1,0,8])}function En(A){return A.env.get("COPILOT_HOME")||St(A.home,".copilot")}function vo(A){return(A.hooks?.preToolUse??[]).some((X)=>{if(X.type!=="command")return!1;return ho(X.command)||ho(X.bash)||ho(X.powershell)})}function yr(A){return A===void 0||typeof A==="string"}function o2(A){if(!A||typeof A!=="object"||Array.isArray(A))return!1;let z=A;if(z.disableAllHooks!==void 0&&typeof z.disableAllHooks!=="boolean")return!1;if(z.hooks===void 0)return!0;if(!z.hooks||typeof z.hooks!=="object"||Array.isArray(z.hooks))return!1;let X=z.hooks.preToolUse;if(X===void 0)return!0;return Array.isArray(X)&&X.every((ee)=>ee!==null&&typeof ee==="object"&&!Array.isArray(ee)&&yr(ee.type)&&yr(ee.command)&&yr(ee.bash)&&yr(ee.powershell))}function bo(A,z){try{let X=JSON.parse(At(t2(A,"utf-8")));if(!o2(X)){z?.push(`Invalid hook config ${A}: hooks.preToolUse must be an array of hook objects`);return}return X}catch(X){z?.push(`Failed to parse ${A}: ${X instanceof Error?X.message:String(X)}`);return}}function ia(A,z){try{return e2(A).filter((X)=>X.endsWith(".json")).sort((X,ee)=>X.localeCompare(ee))}catch(X){return z?.push(`Failed to read ${A}: ${X instanceof Error?X.message:String(X)}`),[]}}function i2(A,z){if(!hr(A))return[];let X=[];for(let ee of ia(A,z)){let te=St(A,ee),ae=bo(te,z);if(ae&&vo(ae))X.push(te)}return X}function gn(A,z){if(!hr(A))return;let X=bo(A,z);if(!X)return;return{path:A,config:X}}function ra(A,z,X,ee){if(z){A.push(`GitHub Copilot CLI ${z} does not support ${X}; requires ${ee}+`);return}A.push(`GitHub Copilot CLI version unavailable; skipping ${X} because it requires ${ee}+`)}function s2(A){for(let z of A){if(z?.config.disableAllHooks===!0)return z.path;if(z?.config.disableAllHooks===!1)return}return}function a2(A,z,X,ee){let te=En(A),ae=St(z,".github","hooks"),le=St(te,"hooks"),ye=St(z,".github","copilot"),he=St(z,".claude"),ve=r2(X),be=ve===!0?ee:void 0,Ie=[gn(St(ye,"settings.local.json"),be),gn(St(ye,"settings.json"),be),gn(St(he,"settings.local.json"),be),gn(St(he,"settings.json"),be)],Xe=[gn(St(te,"settings.json"),be),gn(St(te,"config.json"),be)];if(ve!==!1){let gt=s2([...Ie,...Xe]);if(gt){if(ve===null)ee.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${gt} as active`);return{activeConfigPaths:[],disabledBy:gt}}}let et=i2(ae,ee),Ee=n2(X),at=Ee===!0?ee:void 0,ct=hr(le)?ia(le,at):[],lt=[];for(let gt of ct){let ut=St(le,gt),vt=bo(ut,at);if(vt&&vo(vt))lt.push(ut)}if(Ee!==!0&&lt.length>0)ra(ee,X,`user hook files in ${le}`,"0.0.422"),lt.length=0;let pt=[];for(let gt of[...Ie,...Xe]){if(!gt)continue;if(!vo(gt.config))continue;if(ve===!0){pt.push(gt);continue}ra(ee,X,"inline hook definitions in Copilot config files","1.0.8");break}let mt=(gt)=>gt.filter((ut)=>!!ut&&pt.includes(ut)).map((ut)=>ut.path);return{activeConfigPaths:[...mt(Ie),...et,...mt(Xe),...lt]}}function sa(A){let z=[],X=a2(A.environment,A.cwd,A.copilotCliVersion,z);if(X.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:X.disabledBy,configPaths:[X.disabledBy],errors:z.length>0?z:void 0};let ee=En(A.environment),te=St(ee,"installed-plugins",...mr),ae=hr(te),le=St(ee,"settings.json"),ye=Ot(le,At);if(ae&&ye.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};if(ae&&ye.kind==="ok"&&ft(ft(ye.value,"enabledPlugins"),Ft)===!1)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:le,errors:[`${Ft} is installed but not enabled in Copilot CLI`]};if(ae||X.activeConfigPaths.length>0){let he=ae,ve=X.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:he?"plugin config":"hook config",configPath:ve??(he?te:void 0),configPaths:X.activeConfigPaths.length>0?X.activeConfigPaths:void 0,errors:z.length>0?z:void 0}}return{platform:"copilot-cli",status:"n/a",errors:z.length>0?z:void 0}}import{existsSync as h2,readFileSync as v2}from"node:fs";import{existsSync as aa,mkdirSync as d2,readFileSync as u2}from"node:fs";import{dirname as p2,join as f2}from"node:path";import{renameSync as l2,writeFileSync as c2}from"node:fs";function kt(A,z){let X=`${A}.${process.pid}.tmp`;c2(X,z),l2(X,A)}var jt=Object.fromEntries(Cn.map((A)=>[A.id,`npx -y cc-safety-net hook ${A.flags[1]}`]));var Dn=jt.cursor,la=30;function br(A){return f2(A.home,".cursor","hooks.json")}function Qt(A){return typeof A==="object"&&A!==null&&!Array.isArray(A)}function Lo(){return{command:Dn,timeout:la,failClosed:!0}}function vr(A){return Qt(A)&&A.command===Dn}function m2(A){return Object.keys(A).length===3&&A.command===Dn&&A.timeout===la&&A.failClosed===!0}function g2(A){try{return JSON.parse(u2(A,"utf-8"))}catch(z){if(z instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${A}: ${z.message}`);throw z}}function ca(A){let z=g2(A);if(!Qt(z))throw Error(`Cursor hooks config ${A} must be a JSON object`);if(z.version!==1)throw Error(`Cursor hooks config ${A} must set "version": 1`);if(z.hooks!==void 0&&!Qt(z.hooks))throw Error(`Cursor hooks config ${A} "hooks" must be an object`);let X=Qt(z.hooks)?z.hooks.preToolUse:void 0;if(X!==void 0&&!Array.isArray(X))throw Error(`Cursor hooks config ${A} "hooks.preToolUse" must be an array`);return z}function da(A){let z=Qt(A.hooks)?A.hooks.preToolUse:void 0;return Array.isArray(z)?z:[]}function y2(A){if(!A.some(vr))return[...A,Lo()];return A.reduce((z,X)=>{if(!vr(X))return z.result.push(X),z;if(!z.inserted)z.result.push(Lo()),z.inserted=!0;return z},{result:[],inserted:!1}).result}function ua(A,z,X){let ee=Qt(z.hooks)?z.hooks:{},te={...z,hooks:{...ee,preToolUse:X}};kt(A,`${JSON.stringify(te,null,2)}
`)}function pa(A){let z=br(A);if(!aa(z))return d2(p2(z),{recursive:!0}),kt(z,`${JSON.stringify({version:1,hooks:{preToolUse:[Lo()]}},null,2)}
`),{path:z,alreadyInstalled:!1};let X=ca(z),ee=da(X),te=ee.filter(vr);if(Qt(X.hooks)&&Array.isArray(X.hooks.preToolUse)&&te.length===1&&te[0]!==void 0&&m2(te[0]))return{path:z,alreadyInstalled:!0};return ua(z,X,y2(ee)),{path:z,alreadyInstalled:!1}}function fa(A){let z=br(A);if(!aa(z))return{path:z,alreadyInstalled:!1};let X=ca(z),ee=da(X),te=ee.filter((ae)=>!vr(ae));if(te.length===ee.length)return{path:z,alreadyInstalled:!1};return ua(z,X,te),{path:z,alreadyInstalled:!0}}function b2(A){if(!A||typeof A!=="object"||Array.isArray(A))return[];let z=A.hooks;if(!z||typeof z!=="object"||Array.isArray(z))return[];let X=z.preToolUse;if(!Array.isArray(X))return[];return X.filter((ee)=>!!ee&&typeof ee==="object"&&!Array.isArray(ee)&&ee.command===Dn)}function L2(A){let z=[];if(A.length>1)z.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let X=A[0];if(X&&X.failClosed!==!0)z.push('Managed hook is missing "failClosed": true; reinstall to repair');if(X&&X.timeout!==30)z.push('Managed hook "timeout" is not 30; reinstall to repair');return z}function ma(A){let z=br(A.environment);if(!h2(z))return{platform:"cursor",status:"n/a",configPath:z};let X;try{X=JSON.parse(v2(z,"utf-8"))}catch(ae){return{platform:"cursor",status:"n/a",configPath:z,errors:[`Failed to parse Cursor hooks config ${z}: ${ae instanceof Error?ae.message:String(ae)}`]}}let ee=b2(X);if(ee.length===0)return{platform:"cursor",status:"n/a",configPath:z};let te=L2(ee);return{platform:"cursor",status:"configured",method:"hook config",configPath:z,errors:te.length>0?te:void 0}}import{existsSync as w2}from"node:fs";import{join as wo}from"node:path";var ko="gemini-safety-net";function xo(A){let z=wo(A.home,".gemini","extensions"),X=wo(z,ko);if(!w2(X))return{platform:"gemini-cli",status:"n/a"};let ee=wo(z,"extension-enablement.json"),te=Ot(ee);if(te.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let ae=te.kind==="ok"?ft(ft(te.value,ko),"overrides"):void 0;if(Array.isArray(ae)&&ae.some((ye)=>typeof ye==="string"&&ye.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:ee,errors:[`${ko} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:X}}function ga(A){return xo(A.environment)}import{existsSync as S2,readFileSync as R2}from"node:fs";import{existsSync as ha,mkdirSync as k2,readFileSync as va,rmSync as x2}from"node:fs";import{dirname as C2,join as ya}from"node:path";var An=jt["grok-build"],kr=30;function xr(A){return ya(A.env.get("GROK_HOME")??ya(A.home,".grok"),"hooks","cc-safety-net.json")}function en(A){return typeof A==="object"&&A!==null&&!Array.isArray(A)}function Lr(){return{hooks:[{type:"command",command:An,timeout:kr}]}}function ba(A){return en(A)&&A.command===An}function La(A){return A.flatMap((z)=>{if(!en(z)||!Array.isArray(z.hooks))return[z];let X=z.hooks.filter((ee)=>!ba(ee));if(X.length===z.hooks.length)return[z];return X.length===0?[]:[{...z,hooks:X}]})}function wa(A){try{let z=JSON.parse(A);return en(z)?z:null}catch{return null}}function ka(A){let z=en(A.hooks)?A.hooks.PreToolUse:void 0;return Array.isArray(z)?z:[]}function wr(A,z,X){let ee=en(z.hooks)?z.hooks:{};kt(A,`${JSON.stringify({...z,hooks:{...ee,PreToolUse:X}},null,2)}
`)}function xa(A){let z=xr(A);if(!ha(z))return k2(C2(z),{recursive:!0}),wr(z,{},[Lr()]),{path:z,alreadyInstalled:!1};let X=wa(va(z,"utf-8"));if(!X)return wr(z,{},[Lr()]),{path:z,alreadyInstalled:!1};let ee=ka(X),te=ee.filter((ae)=>en(ae)&&Array.isArray(ae.hooks)&&ae.hooks.some(ba));if(te.length===1&&JSON.stringify(te[0])===JSON.stringify(Lr()))return{path:z,alreadyInstalled:!0};return wr(z,X,[...La(ee),Lr()]),{path:z,alreadyInstalled:!1}}function Ca(A){let z=xr(A);if(!ha(z))return{path:z,alreadyInstalled:!1};let X=wa(va(z,"utf-8"));if(!X)return{path:z,alreadyInstalled:!1};let ee=ka(X),te=La(ee);if(JSON.stringify(te)===JSON.stringify(ee))return{path:z,alreadyInstalled:!1};let ae=en(X.hooks)?X.hooks:{};if(te.length===0&&Object.keys(X).length===1&&Object.keys(ae).length===1)return x2(z),{path:z,alreadyInstalled:!0};return wr(z,X,te),{path:z,alreadyInstalled:!0}}function _n(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}function P2(A){if(!_n(A)||!_n(A.hooks))return[];let z=A.hooks.PreToolUse;if(!Array.isArray(z))return[];return z.filter((X)=>_n(X)&&Array.isArray(X.hooks)&&X.hooks.some((ee)=>_n(ee)&&ee.command===An))}function E2(A){let X=(Array.isArray(A.hooks)?A.hooks.filter(_n):[]).find((ee)=>ee.command===An);return[...A.matcher===void 0||A.matcher===""||A.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...X?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...X?.timeout===kr?[]:[`Managed hook "timeout" is not ${kr}; reinstall to repair`]]}function Sa(A){let z=xr(A.environment);if(!S2(z))return{platform:"grok-build",status:"n/a",configPath:z};let X;try{X=JSON.parse(R2(z,"utf-8"))}catch(ae){return{platform:"grok-build",status:"n/a",configPath:z,errors:[`Failed to parse Grok Build hooks config ${z}: ${ae instanceof Error?ae.message:String(ae)}`]}}let ee=P2(X)[0];if(!ee)return{platform:"grok-build",status:"n/a",configPath:z};let te=E2(ee);return{platform:"grok-build",status:"configured",method:"hook config",configPath:z,errors:te.length>0?te:void 0}}import{readFileSync as $a}from"node:fs";import{join as Ia}from"node:path";var _t="cc-safety-net",Co="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",D2=30;function Ra(A){return`${Co}
# version: ${A}
`}function A2(A){return`${Ra(A)}name: ${_t}
version: "${A}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function _2(A){return`${Ra(A)}"""CC Safety Net guard for Hermes Agent.

Registers pre_tool_call and forwards the tool call to the packaged CC Safety Net
adapter (cc-safety-net hook --hermes-agent) over JSON stdin. The adapter prints nothing
when the call is allowed and an {"action": "block", ...} directive when it is denied.
Hermes ignores a callback that raises, so every transport and analysis failure is turned
into an explicit block here instead.
"""

import json
import os
import shutil
import signal
import subprocess

HOOK_EVENT = "pre_tool_call"
SUPPORTED_TOOLS = ("patch", "read_file", "terminal", "write_file")
ANALYZER = [${jt["hermes-agent"].split(" ").map((z)=>`"${z}"`).join(", ")}]
TIMEOUT_SECONDS = ${D2}


def _block(detail):
    return {"action": "block", "message": "CC Safety Net failed closed: " + detail}


def _terminal_cwd(task_id, process_cwd):
    """Return the directory Hermes will run this terminal command in.

    A \`terminal\` call without \`workdir\` runs in the session's own cwd RECORD, not in the
    Hermes process directory: \`_resolve_command_cwd\` in tools/terminal_tool.py returns
    \`workdir or get_session_cwd(session_key) or default_cwd\`, and that record is rewritten
    after every completed command, so it IS the session's \`cd\` state. The session key is
    derived exactly as terminal_tool derives it: the contextvar when set, the raw task_id
    otherwise. No record yet (first command of a session) means \`default_cwd\`, which the local
    terminal backend reads from \`TERMINAL_CWD\` (\`hermes_cli/config.py\` bridges the configured
    \`terminal.cwd\` into it) and only then falls back to the process directory.
    """
    from tools.approval import get_current_session_key
    from tools.terminal_tool import get_session_cwd

    return (
        get_session_cwd(get_current_session_key(default="") or (task_id or ""))
        or os.environ.get("TERMINAL_CWD")
        or process_cwd
    )


def _pre_tool_call(tool_name="", args=None, session_id="", task_id="", **_):
    if tool_name not in SUPPORTED_TOOLS:
        return None

    executable = shutil.which(ANALYZER[0])
    if executable is None:
        return _block(ANALYZER[0] + " was not found on PATH.")

    try:
        cwd = os.getcwd()
    except OSError as error:
        return _block("the working directory could not be resolved (%s)." % error)

    if tool_name == "terminal":
        try:
            cwd = _terminal_cwd(task_id, cwd)
        except ImportError as error:
            # Without the session record we cannot tell which directory the command runs in,
            # and analysing the wrong one clears every path-scoped protection.
            return _block(
                "the Hermes session directory could not be read (%s). Update cc-safety-net and "
                "reinstall the plugin with: npx -y cc-safety-net install --hermes-agent." % error
            )

    payload = json.dumps(
        {
            "hook_event_name": HOOK_EVENT,
            "tool_name": tool_name,
            "tool_input": args if isinstance(args, dict) else None,
            "session_id": session_id if isinstance(session_id, str) else "",
            "cwd": cwd,
        }
    )

    try:
        if os.name == "nt":
            launch_options = {}
        else:
            launch_options = {"start_new_session": True}
        process = subprocess.Popen(
            [executable] + ANALYZER[1:],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            # Decode explicitly: the analyzer writes UTF-8, and a locale decoder would raise
            # UnicodeDecodeError on output it cannot read — an exception Hermes swallows by
            # allowing the tool call. "replace" turns that into unreadable output, which blocks.
            encoding="utf-8",
            errors="replace",
            # Resolve the analyzer from a neutral directory: npx prefers a repository-local
            # node_modules/.bin/cc-safety-net, so inheriting Hermes' working directory would
            # let workspace contents stand in for the analyzer. The payload's "cwd" above is
            # still the real Hermes working directory, which the analysis needs.
            cwd=os.path.expanduser("~"),
            # Own process group so the timeout below can kill the whole tree: npx's descendants
            # outlive a kill aimed at npx alone and keep holding the pipes captured here. Windows
            # uses taskkill's process-tree traversal instead because sessions are POSIX-only.
            **launch_options,
        )
    except OSError as error:
        return _block("analysis could not start (%s)." % error)

    try:
        stdout, _ = process.communicate(payload, timeout=TIMEOUT_SECONDS)
    except subprocess.TimeoutExpired:
        try:
            if os.name == "nt":
                system_root = os.environ.get("SystemRoot")
                if not system_root:
                    raise OSError("SystemRoot is unavailable")
                subprocess.run(
                    [
                        os.path.join(system_root, "System32", "taskkill.exe"),
                        "/PID",
                        str(process.pid),
                        "/T",
                        "/F",
                    ],
                    stdin=subprocess.DEVNULL,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    timeout=1,
                    check=False,
                )
            else:
                os.killpg(process.pid, signal.SIGKILL)
        except (OSError, subprocess.SubprocessError):
            pass
        try:
            process.communicate(timeout=1)
        except (OSError, subprocess.SubprocessError):
            pass
        return _block("analysis timed out after %ss." % TIMEOUT_SECONDS)

    if process.returncode != 0:
        return _block("analysis exited with status %s." % process.returncode)

    directive = (stdout or "").strip()
    if not directive:
        return None

    try:
        parsed = json.loads(directive)
    except ValueError:
        return _block("analysis returned unreadable output.")

    if isinstance(parsed, dict) and parsed.get("action") == "block":
        message = parsed.get("message")
        if isinstance(message, str) and message:
            return parsed
    return _block("analysis returned an unexpected directive.")


def register(ctx):
    ctx.register_hook("pre_tool_call", _pre_tool_call)
`}function Tn(A){return[{name:"__init__.py",content:_2(A)},{name:"plugin.yaml",content:A2(A)}]}import{mkdirSync as T2,readdirSync as $2,readFileSync as I2,rmSync as So}from"node:fs";import{join as tn}from"node:path";var O2="__pycache__";function Ro(A){let z=A.env.get("HERMES_HOME")?.trim();return z?z:tn(A.home,".hermes")}function Po(A){return tn(Ro(A),"plugins",_t)}function Eo(A){return A.startsWith(Co)}function Do(A,z){let X=Po(A),ee=Lt(X);if(ee&&(ee.isSymbolicLink()||!ee.isDirectory()))throw Error(`Refusing to ${z} ${X}: not a regular directory. Move or remove it and rerun ${z==="install"?"install":"uninstall"} --hermes-agent.`);return X}function Pa(A,z){let X=Lt(A);if(!X)return;if(X.isSymbolicLink()||!X.isFile())throw Error(`Refusing to ${z} ${A}: not a regular file. Move or remove it.`);let ee=I2(A,"utf-8");if(!Eo(ee))throw Error(`Refusing to ${z} unmanaged file at ${A}. Move or remove it.`);return ee}function Ea(A){let z=Do(A,"install"),X=Tn(wt());if(X.map((te)=>Pa(tn(z,te.name),"overwrite")).every((te,ae)=>te===X[ae]?.content))return{path:z,alreadyInstalled:!0};return T2(z,{recursive:!0}),X.forEach((te)=>{kt(tn(z,te.name),te.content)}),{path:z,alreadyInstalled:!1}}function Ao(A){let z=Do(A,"remove");if(!Lt(z))return[];return Tn(wt()).filter((X)=>Pa(tn(z,X.name),"remove")!==void 0)}function Da(A){let z=Do(A,"remove");if(!Lt(z))return{path:z,alreadyInstalled:!1};let X=Ao(A);if(X.forEach((ee)=>{So(tn(z,ee.name))}),So(tn(z,O2),{recursive:!0,force:!0}),$2(z).length===0)So(z,{recursive:!0});return{path:z,alreadyInstalled:X.length>0}}var Cr="hermes-agent",Aa=/^([^\s#][^:]*):/,F2=/^\s+([A-Za-z_][\w-]*):/,_a=/^\s+-\s*(.*)$/;function j2(A){return A.trim().replace(/^(["'])(.*)\1$/,"$2")}function N2(A){let z=A.split(/\r?\n/),X=z.findIndex((ae)=>Aa.exec(ae)?.[1]?.trim()==="plugins");if(X===-1)return[];let ee=z.slice(X+1),te=ee.findIndex((ae)=>Aa.test(ae));return te===-1?ee:ee.slice(0,te)}function Ta(A,z){let X=N2(A),ee=X.findIndex((le)=>F2.exec(le)?.[1]===z);if(ee===-1)return[];let te=X.slice(ee+1),ae=te.findIndex((le)=>!_a.test(le));return(ae===-1?te:te.slice(0,ae)).map((le)=>j2(_a.exec(le)?.[1]??""))}function M2(A){try{return $a(Ia(Ro(A),"config.yaml"),"utf-8")}catch{return}}function _o(A){let z=M2(A)??"";return Ta(z,"enabled").includes(_t)&&!Ta(z,"disabled").includes(_t)}function Oa(A){return/^# version:\s*(.+)$/m.exec(A)?.[1]?.trim()}function H2(A,z){let X=Lt(A);if(!X)return{error:`${z.name} is missing from ${A}; run install --hermes-agent`};if(X.isSymbolicLink()||!X.isFile())return{error:`${A} is a symlink or not a regular file; move or remove it`};try{let ee=$a(A,"utf-8");if(!Eo(ee))return{error:`Unmanaged ${z.name} occupies ${A}; move or remove it`};if(Oa(ee)===wt()&&ee!==z.content)return{error:`Modified ${z.name} occupies ${A}; run install --hermes-agent to restore it`};return{content:ee}}catch(ee){return{error:`Failed to read ${A}: ${ee instanceof Error?ee.message:String(ee)}`}}}function Fa(A){let z=Po(A.environment),X=dr(Cr,z);if(X)return X;let ee=Tn(wt()).map((ye)=>H2(Ia(z,ye.name),ye)),te=ee.flatMap((ye)=>("error"in ye)?[ye.error]:[]);if(te.length>0)return{platform:Cr,status:"n/a",configPath:z,errors:te};let ae=ee.some((ye)=>("content"in ye)&&Oa(ye.content)!==wt()),le=ae?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!_o(A.environment))return{platform:Cr,status:"disabled",method:"plugin directory",configPath:z,errors:[`${_t} is not enabled in Hermes; run \`hermes plugins enable ${_t}\``,...le]};return{platform:Cr,status:"configured",method:"plugin directory",configPath:z,errors:ae?le:void 0}}import{existsSync as U2,readFileSync as G2}from"node:fs";import{join as ja}from"node:path";var B2=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/;function q2(A){return ja(A.env.get("KIMI_CODE_HOME")||ja(A.home,".kimi-code"),"config.toml")}function $n(A){let z=q2(A.environment);if(!U2(z))return{platform:"kimi-code",status:"n/a",configPath:z};try{if(!B2.test(G2(z,"utf-8")))return{platform:"kimi-code",status:"n/a",configPath:z}}catch(X){return{platform:"kimi-code",status:"n/a",configPath:z,errors:[`Failed to read ${z}: ${X instanceof Error?X.message:String(X)}`]}}return{platform:"kimi-code",status:"configured",method:"hook config",configPath:z}}import{readFileSync as za}from"node:fs";import{join as On}from"node:path";var ht="cc-safety-net",$t="index.js",yn="openclaw.plugin.json",hn="package.json";var Sr="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as J2,lstatSync as W2,readdirSync as K2,readFileSync as Y2}from"node:fs";import{dirname as Ma,join as Gt}from"node:path";import{fileURLToPath as Z2}from"node:url";import{spawn as V2}from"node:child_process";function z2(A){return A.join(" ")}function To(A,z,X){return[`Failed to run ${z2(A)}${z===null?"":` (exit ${z})`}.`,X.trim()].filter(Boolean).join(`
`)}function $o(A){let z={stdout:"",stderr:""};return A.stdout.setEncoding("utf-8"),A.stderr.setEncoding("utf-8"),A.stdout.on("data",(X)=>{z.stdout+=X}),A.stderr.on("data",(X)=>{z.stderr+=X}),z}function Nt(A,z){return new Promise((X,ee)=>{let te=Xt([...A],process.env),ae=V2(te.cmd,te.args,{stdio:["ignore","pipe","pipe"]}),le=$o(ae),ye=()=>[le.stdout,le.stderr].filter(Boolean).join(`
`),he=z?.timeoutMs??120000,ve=setTimeout(()=>{ae.kill(),ee(Error(To(A,null,`Timed out after ${he}ms.
${ye()}`.trim())))},he);ae.on("error",(be)=>{clearTimeout(ve),ee(Error(To(A,null,`${be.message}
${ye()}`.trim())))}),ae.on("close",(be)=>{if(clearTimeout(ve),be!==0){ee(Error(To(A,be,ye())));return}X(z?.stdoutOnly?le.stdout:ye())})})}async function Io(A){for(let z of A)await Nt(z)}async function Na(A){for(let z of A)try{await Nt(z)}catch(X){console.warn(X instanceof Error?X.message:String(X))}}var Oo=Gt("openclaw",ht),X2=[$t,yn,hn];function Fo(A,z){if(A==="~")return z;if(A.startsWith("~/")||A.startsWith("~\\"))return Gt(z,A.slice(2));return A}function Ha(A){let z=A.env.get("OPENCLAW_STATE_DIR")?.trim();if(z)return Fo(z,A.home);let X=A.env.get("OPENCLAW_CONFIG_PATH")?.trim();return X?Ma(Fo(X,A.home)):Gt(A.home,".openclaw")}function Ua(A){let z=A.env.get("OPENCLAW_CONFIG_PATH")?.trim();return z?Fo(z,A.home):Gt(Ha(A),"openclaw.json")}function jo(A){return Gt(Ha(A),"extensions",ht)}function Q2(A){let z=K2(A);if(z.length===0)return!0;if(z.some((te)=>!X2.includes(te)))return!1;let X=Gt(A,$t),ee=Lt(X);return ee!==void 0&&!ee.isSymbolicLink()&&ee.isFile()&&Y2(X,"utf-8").startsWith(Sr)}function No(A){let z=jo(A),X=Lt(z);if(!X)return;if(!X.isSymbolicLink()&&X.isDirectory()&&Q2(z))return;throw Error(`Refusing to modify ${z}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function Ga(){let A=Ma(Z2(import.meta.url));return[Gt(A,Oo),Gt(A,"..",Oo),Gt(A,"..","..","..","dist",Oo)]}function Mo(A=Ga()){return A.find((z)=>J2(z)&&W2(z).isDirectory())}function ef(A=Ga()){let z=Mo(A);if(!z)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return z}function Ba(A=ef()){return[["openclaw","plugins","install",A,"--force"],["openclaw","plugins","enable",ht]]}function tf(A){let z=(()=>{try{return JSON.parse(A)}catch{return}})(),X=ft(ft(z,"plugin"),"status");return typeof X==="string"?X:void 0}async function qa(){let A=tf(await Nt(["openclaw","plugins","inspect",ht,"--runtime","--json"],{stdoutOnly:!0}));if(A==="loaded")return;throw Error(`${A===void 0?`The ${ht} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:`OpenClaw reports the ${ht} plugin with status "${A}".`} Run \`openclaw plugins inspect ${ht} --runtime\` for details.`)}var Rr="openclaw",In=`run \`openclaw plugins enable ${ht}\``;function vn(A,z){let X=On(A,z),ee=Lt(X);if(!ee)return{error:`${z} is missing from ${X}; run install --openclaw`};if(ee.isSymbolicLink()||!ee.isFile())return{error:`${X} is a symlink or not a regular file; move or remove it`};try{return{content:za(X,"utf-8")}}catch(te){return{error:`Failed to read ${X}: ${te instanceof Error?te.message:String(te)}`}}}function Ja(A){try{return JSON.parse(At(A))}catch{return}}function nf(A){let z=vn(A,yn);if("error"in z)return z.error;if(ft(Ja(z.content),"id")===ht)return;return`${On(A,yn)} is not a valid ${ht} manifest; run install --openclaw`}function rf(A){let z=vn(A,hn);if("error"in z)return z.error;let X=ft(ft(Ja(z.content),"openclaw"),"extensions");if(Array.isArray(X)&&X.includes(`./${$t}`))return;return`${On(A,hn)} does not point OpenClaw at ${$t}; run install --openclaw`}function Va(A){return Array.isArray(A)?A.filter((z)=>typeof z==="string"):[]}function of(A){let z=Ua(A);if(!Lt(z))return`${ht} is not enabled; ${In}`;let X=(()=>{try{return JSON.parse(At(za(z,"utf-8")))}catch{return}})();if(X===void 0)return`Failed to read ${z}; fix it, then ${In}`;let ee=ft(X,"plugins");if(ft(ee,"enabled")===!1)return`plugins.enabled is false in ${z}; no OpenClaw plugin loads`;let te=ft(ft(ft(ee,"entries"),ht),"enabled");if(Va(ft(ee,"deny")).includes(ht)||te===!1)return`${ht} is disabled in ${z}; ${In}`;let ae=Va(ft(ee,"allow"));if(ae.length>0&&!ae.includes(ht))return`plugins.allow in ${z} does not list ${ht}; add it, then ${In}`;if(ae.includes(ht)||te===!0)return;return`${ht} is not enabled; ${In}`}function Wa(A){return/^\/\/ version:\s*(.+)$/m.exec(A)?.[1]?.trim()}function sf(A,z,X){if(X===void 0)return[];let ee=vn(X,$t);if("error"in ee||Wa(ee.content)!==z)return[];return[$t,yn,hn].flatMap((te)=>{let ae=vn(A,te),le=vn(X,te);if("error"in ae||"error"in le||ae.content===le.content)return[];return[`Modified ${te} occupies ${On(A,te)}; run install --openclaw to restore it`]})}function Ka(A){let z=jo(A.environment),X=dr(Rr,z);if(X)return X;let ee=vn(z,$t),ae=["error"in ee?ee.error:ee.content.startsWith(Sr)?void 0:`Unmanaged ${$t} occupies ${On(z,$t)}; move or remove it`,nf(z),rf(z)].filter((be)=>be!==void 0),le="content"in ee?Wa(ee.content):void 0,ye=ae.length>0?ae:sf(z,le,Mo());if(ye.length>0)return{platform:Rr,status:"n/a",configPath:z,errors:ye};let he=le===wt()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],ve=of(A.environment);if(ve)return{platform:Rr,status:"disabled",method:"plugin directory",configPath:z,errors:[ve,...he]};return{platform:Rr,status:"configured",method:"plugin directory",configPath:z,errors:he.length>0?he:void 0}}import{existsSync as ff,readFileSync as mf}from"node:fs";import{join as gf}from"node:path";import{existsSync as Ho,readFileSync as Xa,rmSync as af}from"node:fs";import{join as Bt}from"node:path";import{pathToFileURL as lf}from"node:url";var Pr="cc-safety-net",Qa=`${Pr}@latest`,el=["opencode.json","opencode.jsonc"],Ya="CCSafetyNetPlugin",Za={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function Er(A){return Bt(A.env.get("XDG_CONFIG_HOME")||Bt(A.home,".config"),"opencode")}function cf(A){return Bt(Er(A),el[0])}function df(A){return el.map((z)=>Bt(Er(A),z))}function tl(A){return Bt(A.env.get("XDG_CACHE_HOME")||Bt(A.home,".cache"),"opencode","packages",Qa)}function Uo(A){af(tl(A),{recursive:!0,force:!0})}async function nl(A){let z=Bt(tl(A),"node_modules",Pr),X=Bt(z,"package.json");if(!Ho(X))throw Error(`The OpenCode plugin cache at ${z} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${Qa}\` for details.`);let ee=ft(JSON.parse(Xa(X,"utf-8")),"main");if(typeof ee!=="string")throw Error(`The cached OpenCode plugin at ${z} declares no "main" entry.`);let te=Bt(z,ee);if(typeof(await import(lf(te).href))[Ya]==="function")return;throw Error(`The cached OpenCode plugin at ${te} does not export a callable ${Ya}, so OpenCode would load nothing and fail open.`)}function rl(A,z){try{return JSON.parse(At(A))}catch(X){if(X instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${z}: ${X.message}`);throw X}}function uf(A){if(!A||typeof A!=="object"||Array.isArray(A))return!1;let z=A.plugin;if(!Array.isArray(z))return!1;return z.some((X)=>typeof X==="string"&&X.includes(Pr))}function pf(A,z){let X=Ws(A,"plugin",Za);if(!X)throw Error(`Failed to locate OpenCode plugin array in ${z}`);let ee=Ks(A,X,Za.stringError).filter((te)=>te.value.includes(Pr)).map((te)=>te.range).reverse().reduce(fr,A);return rl(ee,z),ee}function ol(A){Uo(A);let z=df(A),X=z.find((te)=>Ho(te)),ee=[];for(let te of z){if(!Ho(te))continue;try{let ae=Xa(te,"utf-8");if(!uf(rl(ae,te)))continue;return kt(te,pf(ae,te)),{path:te,alreadyInstalled:!0}}catch(ae){ee.push(ae instanceof Error?ae.message:String(ae))}}if(ee.length>0)throw Error(ee.join(`
`));return{path:X??cf(A),alreadyInstalled:!1}}function il(A){let z=[],X=Er(A.environment),ee=["opencode.json","opencode.jsonc"];for(let te of ee){let ae=gf(X,te);if(ff(ae))try{let le=mf(ae,"utf-8"),ye=At(le);if((JSON.parse(ye).plugin??[]).some((Ie)=>Ie.includes("cc-safety-net")))return{platform:"opencode",status:"configured",method:"plugin array",configPath:ae,errors:z.length>0?z:void 0}}catch(le){z.push(`Failed to parse ${te}: ${le instanceof Error?le.message:String(le)}`)}}return{platform:"opencode",status:"n/a",errors:z.length>0?z:void 0}}import{join as yf}from"node:path";function Go(A){return yf(A.home,".pi","agent","settings.json")}function Bo(A){if(typeof A!=="string")return!1;return A==="npm:cc-safety-net"||A.startsWith("npm:cc-safety-net@")}function sl(A){let z=Go(A.environment),X=Ot(z);if(X.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(X.kind==="missing")return{platform:"pi",status:"n/a"};let ee=ft(X.value,"packages");if(!Array.isArray(ee))return{platform:"pi",status:"n/a"};let te=ee.find((ye)=>Bo(typeof ye==="string"?ye:ft(ye,"source")));if(te===void 0)return{platform:"pi",status:"n/a"};let ae=ft(te,"extensions");if(Array.isArray(ae)&&ae.some((ye)=>typeof ye==="string"&&ye.startsWith("-")))return{platform:"pi",status:"disabled",method:"package config",configPath:z,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:z}}var hf={amp:Ms,"antigravity-cli":Hs,"claude-code":qs,codex:Vs,"copilot-cli":sa,cursor:ma,"gemini-cli":ga,"grok-build":Sa,"hermes-agent":Fa,"kimi-code":$n,openclaw:Ka,opencode:il,pi:sl};function bn(A,z,X){let ee={...X,cwd:z,environment:A};return Yn.map((te)=>vf(hf[te](ee)))}function vf(A){if(A.status==="not-inspected")return{platform:A.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:A.platform,detected:A.status!=="n/a",configured:A.status==="configured",inspectionStatus:A.status!=="n/a"?"verified":A.errors&&A.errors.length>0?"failed":"not-applicable",method:A.method,configPath:A.configPath,configPaths:A.configPaths,errors:A.errors}}import{join as bf}from"node:path";var Lf=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),wf=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),kf={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function al(A){let z=bf(A.tmpdir,"cc-safety-net-self-test"),X=Lf.map((ee)=>{let te=O(A,u("self-test",{command:ee.command},{kind:"command",shell:"auto"},{configCwd:z,executionCwd:z},ee.command),{guard:{dependencies:{loadPolicySnapshot:()=>wf,getModes:()=>kf,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),ae=ee.expectBlocked?"blocked":"allowed",le=te.decision.kind==="deny"?"blocked":"allowed";return{command:ee.command,description:ee.description,expected:ae,actual:le,passed:ae===le,reason:te.decision.kind==="deny"?te.decision.reason:void 0,ruleId:te.decision.kind==="deny"?te.decision.ruleId:void 0}});return{passed:X.filter((ee)=>ee.passed).length,failed:X.filter((ee)=>!ee.passed).length,total:X.length,results:X}}function qo(A){let z=xt({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},A);if(Ht(z.errors))return null;return{json:z.flags.json,skipUpdateCheck:z.flags.skipUpdateCheck}}async function ll(A,z={}){let X=await Rn(!z.json,()=>{let ee=xf(A,z);return{ready:ee,finish:()=>ee}},()=>Sn(),{loadingMessage:"Checking system status…"});if(z.json)console.log(JSON.stringify(X,null,2));else Cf(X);return X.engineSelfTest.failed>0||X.findings.some((ee)=>ee.severity==="error")?1:0}async function xf(A,z){let X=z.cwd??process.cwd(),ee=await ir(),te=bn(A,X,{ampPluginListOutput:ee.ampPluginListOutput,codexPluginListOutput:ee.codexPluginListOutput,copilotCliVersion:ee.versions["copilot-cli"]}),ae=ts(A,X),le=ns(A),ye=L(A,{cwd:X}),he=ye.policy,ve=E(he,A.env),be=H(he,ve.capabilities),Ie=er(A,7),Xe=Is(A,X),et=z.skipUpdateCheck?{currentVersion:wt(),latestVersion:null,updateAvailable:!1}:await Wt(),Ee={hooks:te,engineSelfTest:al(A),userConfig:ae.userConfig,projectConfig:ae.projectConfig,configState:Ne(ye),effectiveRules:ae.effectiveRules,environment:le,effectiveSafety:{selectedPreset:he.safety.level??"standard",level:ve.effectiveLevel,capabilities:ve.capabilities,ruleOverrides:he.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(be).filter(([,at])=>at.source==="rule_override"&&at.override==="off"&&at.inheritedEnabled&&at.changesInherited).map(([at])=>at),ruleCounts:{stored:Object.keys(he.destructiveCommandRuleOverrides).length,effective:Object.values(be).filter((at)=>at.changesInherited).length},...ye.policyScopes?{policyScopes:ye.policyScopes}:{}},...Xe.length>0?{v2Leftovers:Xe}:{},posture:ys(A,ae.userConfig.path),activity:Ie,update:et,system:ee};return{...Ee,findings:os(Ee)}}function Cf(A){console.log(),console.log(ss(A.hooks)),console.log(),console.log(as(A.engineSelfTest)),console.log(),console.log(ls(A)),console.log(),console.log(cs(A.environment)),console.log(),console.log(ds(A)),console.log(),console.log(us(A.findings)),console.log(),console.log(ps(A.activity)),console.log(),console.log(ms(A.system)),console.log(),console.log(fs(A.update)),console.log(gs(A))}import{existsSync as Sf}from"node:fs";var Rf=/^[A-Za-z0-9_@%+=:,./-]+$/,cl="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function Vo(A){let z=xt({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},A);if(Ht(z.errors))return console.error(cl),console.error("Pass -- before a command that starts with dashes."),null;if(z.values.cwd!==void 0&&!Sf(z.values.cwd))return console.error(`Error: --cwd path does not exist: ${z.values.cwd}`),null;let X=z.positionals.length===1?z.positionals[0]:z.positionals.map((ee)=>Rf.test(ee)?ee:`'${ee.replaceAll("'","'\\''")}'`).join(" ");if(!X)return console.error("Error: No command provided"),console.error(cl),null;return{json:z.flags.json,cwd:z.values.cwd,command:X}}function dl(A){if(A)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function ul(A,z){let ee=z-18;return[`${A.dtl}${A.dh.repeat(z)}${A.dtr}`,`${A.dv}  Command Analysis${" ".repeat(ee)}${A.dv}`,`${A.dbl}${A.dh.repeat(z)}${A.dbr}`]}function zo(A){return JSON.stringify(A)}function pl(A,z=0){return`[${A.map((ee,te)=>is(ee,te,z)).join(",")}]`}function Fn(A,z,X=70){let ee=A.split(" "),te=[],ae="";for(let le of ee)if(ae&&ae.length+le.length+1>X)te.push(ae),ae=le;else ae=ae?`${ae} ${le}`:le;if(ae)te.push(ae);return te.map((le,ye)=>ye===0?le:`${z}${le}`)}function fl(A,z,X){let ee=[];switch(A.type){case"parse":return null;case"env-strip":return ee.push(""),ee.push(`STEP ${z} ${X.h} Strip environment variables`),ee.push(`  Removed: ${A.envVars.map((te)=>`${te}=<redacted>`).join(", ")}`),ee.push(`  Tokens:  ${zo(A.output)}`),{lines:ee,incrementStep:!0};case"leading-tokens-stripped":return ee.push(""),ee.push(`STEP ${z} ${X.h} Strip wrappers`),ee.push(`  Removed: ${A.removed.join(", ")}`),ee.push(`  Tokens:  ${zo(A.output)}`),{lines:ee,incrementStep:!0};case"shell-wrapper":return ee.push(""),ee.push(`STEP ${z} ${X.h} Detect shell wrapper`),ee.push(`  Wrapper: ${A.wrapper} -c`),ee.push(`  Inner:   ${A.innerCommand}`),{lines:ee,incrementStep:!0};case"interpreter":{if(ee.push(""),ee.push(`STEP ${z} ${X.h} Detect interpreter`),ee.push(`  Interpreter: ${A.interpreter}`),ee.push(`  Code:        ${A.codeArg}`),A.paranoidBlocked)ee.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:ee,incrementStep:!0}}case"busybox":return ee.push(""),ee.push(`STEP ${z} ${X.h} Busybox wrapper`),ee.push(`  Subcommand: ${A.subcommand}`),{lines:ee,incrementStep:!0};case"transparent-wrapper":return ee.push(""),ee.push(`STEP ${z} ${X.h} Transparent wrapper`),ee.push(`  Wrapper: ${A.wrapper}`),ee.push(`  Tokens:  ${zo(A.output)}`),{lines:ee,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(ee.push(""),ee.push(`STEP ${z} ${X.h} Match rules`),ee.push(`  Rule:   ${A.rule}()`),A.matched)ee.push("  Result: MATCHED");else ee.push("  Result: No match");return{lines:ee,incrementStep:!0}}case"worktree-relaxation":return ee.push(""),ee.push(`STEP ${z} ${X.h} Worktree relaxation`),ee.push(`  Mode:   ${o.worktree.name}`),ee.push(`  Git cwd: ${A.gitCwd}`),ee.push("  Result: Allowed local discard in linked worktree"),{lines:ee,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(A.embeddedCommandFound)return ee.push(""),ee.push(`STEP ${z} ${X.h} Fallback scan`),ee.push(`  Found: ${A.embeddedCommandFound}`),{lines:ee,incrementStep:!0};return null}case"custom-rules-check":{if(A.rulesChecked){if(ee.push(""),ee.push(`STEP ${z} ${X.h} Custom rules`),A.matched)ee.push("  Result: MATCHED");else ee.push("  Result: No match");return{lines:ee,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(A.matched)return ee.push(""),ee.push(`STEP ${z} ${X.h} Dangerous text check`),ee.push(`  Token:  ${A.token}`),ee.push("  Result: MATCHED"),{lines:ee,incrementStep:!0};return null}case"strict-unparseable":return ee.push(""),ee.push(`STEP ${z} ${X.h} Strict mode check`),ee.push(`  Command: ${A.rawCommand}`),ee.push("  Result:  ✗ UNPARSEABLE"),{lines:ee,incrementStep:!0};case"segment-skipped":return null;case"error":return ee.push(""),ee.push(`ERROR: ${A.message}`),{lines:ee,incrementStep:!1};default:return A}}function Jo(A,z){let X=dl(z?.asciiOnly??!1),ee=58,te=[],ae=1;te.push(...ul(X,58)),te.push("");let le=A.trace.steps.find((Ee)=>Ee.type==="error");if(le&&le.type==="error"){te.push("ERROR"),te.push(`  ${le.message}`),te.push(""),te.push("RESULT"),te.push(`  Status: ${A.result==="blocked"?dt.red("BLOCKED"):dt.green("ALLOWED")}`),te.push(""),te.push("CONFIG");let Ee=A.configSource??"none";return te.push(`  Path: ${Ee}`),te.join(`
`)}let ye=A.trace.steps.find((Ee)=>Ee.type==="parse");if(ye&&ye.type==="parse"){te.push("INPUT"),te.push(`  ${ye.input}`),te.push(""),te.push(`STEP ${ae} ${X.h} Split shell commands`),ae++;for(let Ee=0;Ee<ye.segments.length;Ee++){let at=ye.segments[Ee];if(at){let ct=Math.random();te.push(`  Segment ${Ee+1}: ${pl(at,ct)}`)}}}let he=A.trace.segments,ve=he.length>1;for(let Ee of he){if(ve){te.push("");let pt="";if(ye&&ye.type==="parse"){let Zr=ye.segments[Ee.index];if(Zr)pt=Zr.join(" ")}let mt=54,gt=pt,ut=` Segment ${Ee.index+1}: `,vt=" ";if(pt){if(ut.length+pt.length+vt.length>mt){let Md=mt-ut.length-vt.length;gt=`${pt.substring(0,Md-1)}…`}}let Dt=pt?`${ut}${gt}${vt}`:` Segment ${Ee.index+1} `,jd=pt?`${ut}${dt.cyan(gt)}${vt}`:Dt,Ai=58-Dt.length,_i=Math.floor(Ai/2),Nd=Ai-_i;te.push(`${X.sh.repeat(_i)}${jd}${X.sh.repeat(Nd)}`)}if(Ee.steps.find((pt)=>pt.type==="segment-skipped")){te.push(""),te.push("  (skipped — prior segment blocked)");continue}let ct=!1,lt=!1;for(let pt of Ee.steps){let mt=fl(pt,ae,X);if(mt){if(lt=!0,pt.type==="recurse"){te.push("");let gt=" RECURSING ",ut=58-gt.length-4;te.push(`  ${X.tl}${X.h}${gt}${X.h.repeat(ut)}`),te.push(`  ${X.v}`),ct=!0;continue}for(let gt of mt.lines)if(ct)te.push(`  ${X.v} ${gt}`);else te.push(gt);if(mt.incrementStep)ae++}}if(ct)te.push(`  ${X.v}`),te.push(`  ${X.bl}${X.h.repeat(56)}`),ct=!1;if(!lt)te.push(""),te.push(`  ${dt.green("✓")} Allowed (no matching rules)`)}if(te.push(""),te.push("RESULT"),A.result==="blocked"){if(te.push(`  Status: ${dt.red("BLOCKED")}`),A.customRule){if(te.push(`  Rule: ${A.customRule.id}`),A.customRule.rulebook)te.push(`  Rulebook: ${A.customRule.rulebook.name} ${A.customRule.rulebook.version}`);if(A.customRule.source)te.push(`  Source: ${A.customRule.source}`);if(A.customRule.override)te.push(`  Override: reason ${A.customRule.override.reason}`)}if(A.reason){let Ee=Fn(A.reason,"          ");te.push(`  Reason: ${Ee[0]}`);for(let at=1;at<Ee.length;at++)te.push(Ee[at]??"")}}else te.push(`  Status: ${dt.green("ALLOWED")}`);te.push(""),te.push("CONFIG");let be=A.configSource??"none",Ie=A.configValid?"":" (invalid)";te.push(`  Path: ${be}${Ie}`);let Xe=A.safetyPresetScope;te.push(`  Safety preset: ${A.selectedPreset??"standard"}${Xe?` (${nr(Xe)})`:""}`),te.push(`  Effective capabilities: ${A.effectiveLevel}`);let et=Object.entries(A.destructiveCommandRuleOverrides??{});if(te.push(`  Rule customizations: ${et.length}`),A.ruleActivation)te.push(`  Rule activation: ${A.ruleActivation.id} — ${A.ruleActivation.enabled?"on":"off"} via ${A.ruleActivation.source}`);return te.join(`
`)}function Wo(A){return JSON.stringify(A,null,2)}import{resolve as _f}from"node:path";var Pf=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function ml(A){let z=0,X={allocateSegment(){return z++},getNextSegmentIndex(){return z},recordGlobal(ee){A.record({kind:"step",scope:"global",step:ee})},recordSegment(ee,te=X.currentSegmentIndex){if(te===void 0)return;A.record({kind:"step",scope:"segment",segmentIndex:te,step:ee})}};return X}function gl(A={}){let z=[],X=A.maxEvents??512,ee={maxTextLength:A.maxTextLength??2048,maxListLength:A.maxListLength??128,maxObjectProperties:A.maxObjectProperties??A.maxListLength??128,maxDepth:A.maxDepth??16},te,ae=new Set;return{record(le){if(te)return;if(!le||z.length>=X)return;try{z.push(Zo(Ef(le,ee,ae)))}catch{}},finish(){if(te)return te;return te=Zo({events:Object.freeze(z)}),te}}}function Ef(A,z,X){if(A.kind!=="step")throw TypeError("invalid trace event");let{scope:ee,step:te}=A;Dr(te,X,z);let ae=Ko(te,z,X);if(ee==="global")return{kind:"step",scope:"global",step:ae};if(ee!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:A.segmentIndex,step:ae}}function Dr(A,z,X,ee=0,te=new WeakSet){if(typeof A==="string"){let ye=A.slice(0,X.maxTextLength);if(!He(ye))return;for(let he of Ze(ye))for(let ve of he.match(/[^\s"'()$]+/g)??[])z.add(yl(ve));return}if(!A||typeof A!=="object"||ee>=X.maxDepth||te.has(A))return;if(te.add(A),Array.isArray(A)){let ye=Math.min(A.length,X.maxListLength);for(let he=0;he<ye;he++)Dr(A[he],z,X,ee+1,te);return}let ae=0,le=new Set;for(let ye in A){if(!Object.hasOwn(A,ye))continue;if(ae>=X.maxObjectProperties)break;ae++,Dr(ye,z,X);let he=Yo(ye,X,z);if(le.has(he))continue;le.add(he),Dr(A[ye],z,X,ee+1,te)}}function Ko(A,z,X,ee=0,te=new WeakSet){if(typeof A==="string")return Yo(A,z,X);if(!A||typeof A!=="object")return A;if(ee>=z.maxDepth)return;if(te.has(A))return;if(te.add(A),Array.isArray(A)){let ye=[],he=Math.min(A.length,z.maxListLength);for(let ve=0;ve<he;ve++)ye.push(Ko(A[ve],z,X,ee+1,te));return ye}let ae={},le=0;for(let ye in A){if(!Object.hasOwn(A,ye))continue;if(le>=z.maxObjectProperties)break;le++;let he=Yo(ye,z,X);if(Object.hasOwn(ae,he))continue;Object.defineProperty(ae,he,{value:Ko(A[ye],z,X,ee+1,te),enumerable:!0,configurable:!0,writable:!0})}return ae}function Yo(A,z,X){let ee=A.slice(0,z.maxTextLength),te=He(ee)?Ge(ee):ee,ae=X.size>0?Af(te,X):te;return(Df(ae)?ke(ae):ae).slice(0,z.maxTextLength)}function Df(A){return A.includes("PRIVATE KEY")||A.includes("://")||A.includes("eyJ")||A.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(A)||A.length>=14&&Pf.some((z)=>A.includes(z))||A.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(A)}function Af(A,z){return A.replace(/[^\s"'()$]+/g,(X)=>z.has(yl(X))?"<redacted>":X)}function yl(A){let z=2166136261,X=2166136261;for(let ee=0;ee<A.length;ee++)z=Math.imul(z^A.charCodeAt(ee),16777619),X=Math.imul(X^A.charCodeAt(A.length-ee-1),16777619);return`${z>>>0}:${X>>>0}:${A.length}`}function Zo(A){if(A&&typeof A==="object"&&!Object.isFrozen(A)){for(let z of Object.values(A))Zo(z);Object.freeze(A)}return A}function jn(A,z={},X){let ee=_f(z.cwd??process.cwd()),te=z.policySnapshot??L(X,{cwd:ee,userConfigDir:z.userConfigDir}),ae=E(te.policy,X.env),le=Me({policySnapshot:te,effectiveCapabilities:ae.capabilities,strict:ae.strict,paranoidRm:ae.paranoidRm,paranoidInterpreters:ae.paranoidInterpreters,worktreeMode:ae.worktreeMode}),ye={effectiveLevel:le.effectiveLevel,selectedPreset:te.policy.safety.level??"standard",...te.policyScopes?{safetyPresetScope:te.policyScopes.levelScope}:{},effectiveCapabilities:le.effectiveCapabilities,destructiveCommandRuleOverrides:te.policy.destructiveCommandRuleOverrides},{configSource:he,configValid:ve}=$f(X,{cwd:ee,userConfigDir:z.userConfigDir});if(!A||!A.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:he,configValid:ve,...ye};let be=h(A,"auto");if(be.status==="limited")throw new y;let Ie=be.dialect==="powershell"?h(A,"posix"):be,Xe=st(Ie),et=gl(),Ee=ml(et);Ee.recordGlobal({type:"parse",input:A,segments:Xe.map((Dt)=>[...Dt])});let at=u("Bash",{command:A},{kind:"command",shell:"auto"},{configCwd:ee,executionCwd:ee},A),ct=U(at,{environment:X,trace:Ee,dependencies:{loadPolicySnapshot:()=>te}}),lt=ct.decision.kind==="deny"?ct.decision:null;if(lt&&(ct.stage==="policy-protection"||ct.stage==="secret-protection")){let Dt=Tf(lt);return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:Dt.rule,matched:!0,reason:lt.reason}]}]},result:"blocked",reason:k(lt.reason),segment:k(hl(lt,A)),...Dt.ruleId?{ruleId:k(Dt.ruleId)}:{},configSource:he,configValid:ve,...ye}}let pt=Ee.getNextSegmentIndex();if(lt&&pt>0&&pt<Xe.length)Ee.recordSegment({type:"segment-skipped",index:pt,reason:"prior-segment-blocked"},pt);let mt=et.finish(),gt=lt?.ruleId??If(at,te,ae,X),ut=G.find((Dt)=>Dt.id===gt&&Dt.activationCapability),vt=ut?le.policy.effectiveDestructiveCommandRules[ut.id]:void 0;return{trace:Ff(mt),result:lt?"blocked":"allowed",reason:lt?k(lt.reason):void 0,segment:lt?k(hl(lt,A)):void 0,ruleId:lt?.ruleId?k(lt.ruleId):void 0,customRule:Of(jf(lt?.ruleId,te)),configSource:he,configValid:ve,...ye,...ut&&vt?{ruleActivation:{id:ut.id,...vt}}:{}}}function hl(A,z){return A.evidence?.segment??z}function Tf(A){if(A.reason===Fe)return{ruleId:"policy-protection",rule:"policy-protection:findPolicyConfigMutationTargetInSemanticFacts"};if(A.reason===$e)return{ruleId:"policy-apply-protection",rule:"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts"};if(A.reason===b)return{ruleId:"git-metadata-protection",rule:"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts"};return{ruleId:A.ruleId,rule:"secret-protection:findSensitiveTargetInSemanticFacts"}}function $f(A,z){let X=M(z.cwd),ee=F(A,z),te=q(A,{cwd:z.cwd,userConfigDir:z.userConfigDir});try{if(n(te.projectConfigTarget)!==null){if(Jt(te.projectConfigTarget).errors.length===0)return{configSource:X,configValid:!0};return{configSource:X,configValid:!1}}}catch(ae){if(ae instanceof r)return{configSource:X,configValid:!1};throw ae}try{if(n(te.userConfigTarget)!==null){let ae=Jt(te.userConfigTarget);return{configSource:ee,configValid:ae.errors.length===0}}return{configSource:null,configValid:!0}}catch(ae){if(ae instanceof r)return{configSource:ee,configValid:!1};throw ae}}function If(A,z,X,ee){let te=z.policy,ae=Le({...te,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...te.destructiveCommandRuleOverrides,...Object.fromEntries(G.flatMap((ye)=>ye.activationCapability?[[ye.id,"on"]]:[]))}},z.state==="degraded"?{diagnostics:z.diagnostics,reason:z.reason}:void 0),le=U(A,{environment:ee,dependencies:{loadPolicySnapshot:()=>ae,getModes:()=>({...X,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return le.decision.kind==="deny"?le.decision.ruleId:void 0}function Of(A){if(!A)return;return{id:k(A.id),...A.rulebook?{rulebook:{name:k(A.rulebook.name),version:k(A.rulebook.version)}}:{},...A.source?{source:k(A.source)}:{},...A.override?{override:{type:"reason",reason:k(A.override.reason)}}:{}}}function Ff(A){let z=A.events.flatMap((ee)=>ee.kind==="step"&&ee.scope==="global"?[ee.step]:[]),X=new Map;for(let ee of A.events){if(ee.kind!=="step"||ee.scope!=="segment")continue;let te=X.get(ee.segmentIndex)??{index:ee.segmentIndex,steps:[]};te.steps.push(ee.step),X.set(ee.segmentIndex,te)}return{steps:z,segments:[...X.values()]}}function jf(A,z){let X=A?.replace(/^custom\./,"");if(!X||!z.policy.rules.some((ee)=>ee.name===X))return;return z.ruleMetadata[X]??Object.freeze({id:X})}function vl(A){return new Promise((z)=>{process.stdout.write(`${A}
`,()=>z())})}async function bl(A,z){let X=Vo(z);if(!X)return 1;try{let ee=jn(X.command,{cwd:X.cwd},A),te=!!process.env.NO_COLOR||!process.stdout.isTTY;return await vl(X.json?Wo(ee):Jo(ee,{asciiOnly:te})),0}catch(ee){let te=Nf(ee instanceof p?ee.cause:ee);if(te===void 0)throw ee;if(X.json)return await vl(JSON.stringify({error:te})),1;return console.error(te),1}}function Nf(A){if(A instanceof y)return A.message;if(A instanceof f)return A.message;if(A instanceof s&&a[A.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Ll="2.4.1",It="  ",nn="cc-safety-net";function wl(A){return A.argument?`${A.flags} ${A.argument}`:A.flags}function Mf(A){return Math.max(...A.map((z)=>wl(z).length))}function Hf(A){return Math.max(...A.map((z)=>z.usage.length))}function Uf(A){return Math.max(...A.map((z)=>`${nn} ${z.usage}`.length))}function Gf(A,z){let X=`${nn} ${A.usage}`;return`${It}${X.padEnd(z+2)}${A.description}`}function qt(A,z){return`${It}${A.padEnd(Math.max(40,A.length+2))}${z}`}function Ln(A,z=console.log){let X=[];if(X.push(`${nn} ${A.name}`),X.push(""),X.push(`${It}${A.description}`),X.push(""),X.push("USAGE:"),X.push(`${It}${nn} ${A.usage}`),X.push(""),A.subcommands&&A.subcommands.length>0){X.push("SUBCOMMANDS:");let ee=Hf(A.subcommands);for(let te of A.subcommands)X.push(`${It}${te.usage.padEnd(ee+2)}${te.description}`);X.push("")}if(A.options.length>0){X.push("OPTIONS:");let ee=Mf(A.options);for(let te of A.options){let ae=wl(te),le=te.default?`${te.description} (default: ${te.default})`:te.description;X.push(`${It}${ae.padEnd(ee+2)}${le}`)}X.push("")}if(A.examples&&A.examples.length>0){X.push("EXAMPLES:");for(let ee of A.examples)X.push(`${It}${ee}`)}z(X.join(`
`))}function Xo(){let A=Uf(Xn),z=[];z.push(`${nn} v${Ll}`),z.push(""),z.push("Blocks destructive commands and secret access."),z.push(""),z.push("COMMANDS:");for(let X of Xn)z.push(Gf(X,A));z.push(""),z.push("GLOBAL OPTIONS:"),z.push(`${It}-h, --help       Show help (use with command for command-specific help)`),z.push(`${It}-V, --version    Show version`),z.push(""),z.push("HELP:"),z.push(`${It}${nn} help <command>     Show help for a specific command`),z.push(`${It}${nn} <command> --help   Show help for a specific command`),z.push(""),z.push("ENVIRONMENT VARIABLES:"),z.push(qt(`${o.level.name}=standard|strict|paranoid`,"Set session safety level")),z.push(qt(`${o.worktree.name}=1`,"Allow local git discards in linked worktrees")),z.push(qt(`${o.debug.name}=1`,"Print diagnostic messages to stderr")),z.push(qt(`${o.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),z.push(qt("CC_SAFETY_NET_HOME","Override rule config home directory")),z.push(""),z.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),z.push(qt(`${o.strict.name}=1`,"Force safety.overrides.fail_closed on")),z.push(qt(`${o.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),z.push(qt(`${o.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),z.push(qt(`${o.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),z.push(""),z.push("Documentation:        https://ccsafetynet.com/docs"),console.log(z.join(`
`))}function kl(){console.log(Ll)}function Nn(A,z=console.log){let X=Qn(A);if(!X)return!1;if(X.name.toLowerCase()!==A.toLowerCase())return!1;return Ln(X,z),!0}import{existsSync as ui,readFileSync as vc}from"node:fs";import{join as ci}from"node:path";import*as Kt from"node:readline";function Bf(A){return A==="install"?"Install":"Uninstall"}function qf(A){return A==="install"?"Installing":"Uninstalling"}function Vf(A){return A==="install"?"into":"from"}function Sl(A){return A?.available===!0}function zf(A,z){let X=new Set(z);return A.filter((ee)=>X.has(ee.target)).map((ee)=>ee.target)}function xl(A,z,X){if(A.length===0||A.every((ee)=>!ee.available))return z;return Array.from({length:A.length},(ee,te)=>te+1).map((ee)=>(z+ee*X+A.length)%A.length).find((ee)=>Sl(A[ee]))}function Jf(A,z,X){if(X.ctrl&&X.name==="c")return"interrupt";if(X.name==="escape"||z==="q")return"abort";if(A==="install"&&(z==="u"||z==="U"))return"update";if(X.name==="up"||z==="k")return"up";if(X.name==="down"||z==="j")return"down";if(X.name==="space"||z===" ")return"toggle";if(X.name==="return"||X.name==="enter")return"confirm";return null}function Wf(A){return{cursor:A.findIndex((z)=>z.available),selected:[]}}function Kf(A,z,X){if(X==="confirm"||X==="update"||X==="abort"||X==="interrupt")return{state:A,done:X};if(X==="up")return{state:{...A,cursor:xl(z,A.cursor,-1)}};if(X==="down")return{state:{...A,cursor:xl(z,A.cursor,1)}};let ee=z[A.cursor];if(!Sl(ee))return{state:A};let te=A.selected.includes(ee.target)?A.selected.filter((ae)=>ae!==ee.target):zf(z,[...A.selected,ee.target]);return{state:{...A,selected:te}}}var Rl="◉",Pl="◯",El=">",Dl=" ";function Yf(A,z,X,ee={}){let te=ee.color!==!1,ae=te?dt.dim:(he)=>he,le=te?dt.green:(he)=>he,ye=te?dt.bold:(he)=>he;return["",`${Bf(A)} CC Safety Net ${Vf(A)}:`,"",...z.map((he,ve)=>{let be=X.selected.includes(he.target),Ie=ve===X.cursor,Xe=be?Rl:Pl,et=Ie?El:Dl,Ee=he.available?"":` (${he.unavailableReason??"not installed"})`,at=`${Xe} ${he.label}${Ee}`,ct=!he.available?ae(at):be?le(at):Ie?ye(at):at;return`${et} ${ct}`}),"",A==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":z.some((he)=>he.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${A}. q/Esc: close`].join(`
`)}var Cl=["global-hook","plugin"];function Zf(A,z,X={}){let ee=X.color!==!1?dt.bold:(ae)=>ae;return["","Install the Kimi Code integration as:","",...[`Global hook — ${z?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((ae,le)=>{let ye=le===A,he=`${ye?Rl:Pl} ${ae}`;return`${ye?El:Dl} ${ye?ee(he):he}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function Al(A){let{input:z,output:X}=A;Kt.emitKeypressEvents(z);let ee=z.isRaw===!0;z.setRawMode(!0),z.resume();let te=0,ae=()=>{if(te===0)return;Kt.moveCursor(X,0,-te),Kt.cursorTo(X,0),Kt.clearScreenDown(X)},le=()=>{ae();let ye=A.render();X.write(`${ye}
`),te=ye.split(`
`).length};return new Promise((ye)=>{let he=(be)=>{z.off("keypress",ve),z.setRawMode(ee),z.pause(),ae(),ye(be)};function ve(be,Ie){A.onKey(be,Ie,{finish:he,draw:le})}z.on("keypress",ve),le()})}function _l(A={}){let z=0;return Al({input:A.input??process.stdin,output:A.output??process.stdout,render:()=>Zf(z,A.globalHookInstalled===!0),onKey:(X,ee,te)=>{if(ee.ctrl&&ee.name==="c"){te.finish(null),(A.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(ee.name==="escape"||X==="q")return te.finish(null);if(ee.name==="return"||ee.name==="enter")return te.finish(Cl[z]);if(ee.name==="up"||ee.name==="down"||X==="k"||X==="j")z=(z+1)%Cl.length,te.draw()}})}function Qo(A=process.stdin,z=process.stdout){return Boolean(A.isTTY&&z.isTTY&&typeof A.setRawMode==="function")}function Tl(A,z,X={}){let ee=X.output??process.stdout,te=Wf(z);return Al({input:X.input??process.stdin,output:ee,render:()=>Yf(A,z,te),onKey:(ae,le,ye)=>{let he=Jf(A,ae,le);if(!he)return;let ve=Kf(te,z,he);if(te=ve.state,ve.done==="interrupt"){ye.finish(null),(X.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(ve.done==="abort")return ye.finish(null);if(ve.done==="update")return ye.finish("update");if(ve.done==="confirm"){if(te.selected.length===0){ee.write("\x07"),ye.draw();return}ye.finish([...te.selected]),ee.write(`${qf(A)} selected integrations...
`);return}ye.draw()}})}import{existsSync as $l,lstatSync as Qf,mkdirSync as em,mkdtempSync as tm,readdirSync as nm,readFileSync as kn,rmSync as _r}from"node:fs";import{basename as rm,dirname as om,join as Et}from"node:path";import{fileURLToPath as im}from"node:url";var ei="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",rn="cc-safety-net",on="cc-safety-net/index.ts";import{spawn as Xf}from"node:child_process";var ti=(A,z)=>{let X=Xt([...A],process.env);return new Promise((ee)=>{let te=Xf(X.cmd,X.args,{cwd:z,stdio:["ignore","pipe","pipe"]}),ae=$o(te),le=!1,ye=setTimeout(()=>{le=!0,te.kill()},120000);te.on("error",(he)=>{clearTimeout(ye),ee({status:null,errorCode:he.code,stdout:ae.stdout,stderr:[he.message,ae.stderr].filter(Boolean).join(`
`)})}),te.on("close",(he)=>{clearTimeout(ye),ee({status:le?null:he,errorCode:le?"ETIMEDOUT":void 0,stdout:ae.stdout,stderr:ae.stderr})})})};var wn="cc-safety-net.ts",ni=Et("amp",on);function sm(A){return Et(A.home,".config","amp","plugins","cc-safety-net.ts")}function am(){let A=om(im(import.meta.url));return[Et(A,ni),Et(A,"..",ni),Et(A,"..","..","..","dist",ni)]}function lm(A=am()){let z=A.find((X)=>$l(X)&&Qf(X).isFile());if(!z)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return z}function Il(A){try{return JSON.parse(A)}catch{return}}function Tr(A){return A.subarray(0,Buffer.byteLength(ei)).toString("utf-8")===ei}async function Mn(A,z,X){let ee=await A(z,X);if(ee.status===0)return ee;throw Error([`Failed to run ${z.join(" ")}${ee.status===null?"":` (exit ${ee.status})`}.`,[ee.stdout,ee.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function Ol(A){let z=await A(["amp","plugins","repositories","--json"]);if(z.status===null)throw Error(`${z.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${z.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${z.stderr}`.trim());if(z.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${z.status}). Sign in with "amp login" and rerun install --amp.
${[z.stdout,z.stderr].filter(Boolean).join(`
`)}`.trim());let X=Il(z.stdout),ee=(Array.isArray(X)?X:[]).filter((te)=>ft(te,"scope")==="user"&&ft(te,"exists")===!0&&ft(te,"viewerCanWrite")===!0).map((te)=>ft(te,"cloneRef")).find((te)=>typeof te==="string"&&te.length>0);if(!ee)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return ee}async function Fl(A,z,X){let ee=tm(Et(z.tmpdir,"cc-safety-net-amp-"));try{return await Mn(A,["amp","clone","user-plugins",ee]),await X(ee)}finally{_r(ee,{recursive:!0,force:!0})}}function ri(A){return`rerun ${A==="overwrite"?"install":"uninstall"} --amp`}function jl(A,z,X){let ee=Et(A,z),te=Lt(ee);if(!te)return;if(te.isSymbolicLink()||!te.isFile())throw Error(`Refusing to ${X} ${z} in your Amp personal plugins repository: not a regular file. Remove it there and ${ri(X)}.`);let ae=kn(ee);if(Tr(ae))return ae;throw Error(`Refusing to ${X} unmanaged file ${z} in your Amp personal plugins repository. Remove it there and ${ri(X)}.`)}function Nl(A,z){let X=Et(A,rn),ee=Lt(X);if(!ee)return;if(ee.isSymbolicLink()||!ee.isDirectory())throw Error(`Refusing to ${z} ${rn} in your Amp personal plugins repository: not a regular directory. Remove it there and ${ri(z)}.`);return jl(A,on,z)}function cm(A){let z=Et(A,wn),X=Lt(z);if(!X||X.isSymbolicLink()||!X.isFile())return;let ee=kn(z);return Tr(ee)?ee:void 0}async function Ml(A,z,X,ee){if(await Mn(A,X,z),(await Mn(A,["git","status","--porcelain"],z)).stdout.trim()==="")return!1;return await Mn(A,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",ee],z),await Mn(A,["git","push","origin","HEAD"],z),!0}function Ar(A,z){dm(A,z),um(A,z)}function Hl(A,z){if(z==="keep")return;throw Error(`Local Amp plugin ${A} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function dm(A,z){let X=sm(A),ee=Lt(X);if(!ee)return;if(!ee.isSymbolicLink()&&ee.isFile()&&Tr(kn(X))){_r(X);return}Hl(X,z)}function um(A,z){let X=Et(A.home,".config","amp","plugins",rn),ee=Lt(X);if(!ee)return;if(!ee.isSymbolicLink()&&ee.isDirectory()&&pm(X)){_r(X,{recursive:!0});return}Hl(X,z)}function pm(A){let z=rm(on);if(nm(A).join("\x00")!==z)return!1;let X=Et(A,z),ee=Lt(X);return!!ee&&!ee.isSymbolicLink()&&ee.isFile()&&Tr(kn(X))}function fm(A){let z=d(A);if(!$l(z))return"";let X=Il(kn(z,"utf-8"));if(!X||typeof X!=="object"||Array.isArray(X))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(x(X,A.home))};
`}async function Ul(A,z=lm(),X=ti){let ee=Buffer.concat([kn(z),Buffer.from(fm(A),"utf-8")]),te=await Ol(X);return Fl(X,A,async(ae)=>{let le=`${te}/${rn}`,ye=Nl(ae,"overwrite"),he=jl(ae,wn,"overwrite");if(ye?.equals(ee)&&!he)return Ar(A,"fail"),{path:le,alreadyInstalled:!0};if(em(Et(ae,rn),{recursive:!0}),kt(Et(ae,on),ee),he)_r(Et(ae,wn));let ve=await Ml(X,ae,["git","add","--",on,...he?[wn]:[]],`chore: update cc-safety-net plugin to v${wt()}`);return Ar(A,"fail"),{path:le,alreadyInstalled:!ve}})}async function Gl(A,z=ti){let X=await Ol(z);return Fl(z,A,async(ee)=>{let te=Nl(ee,"remove"),ae=cm(ee),le=`${X}/${ae&&!te?wn:rn}`;if(!te&&!ae)return Ar(A,"keep"),{path:le,alreadyInstalled:!1};return await Ml(z,ee,["git","rm","--",...te?[on]:[],...ae?[wn]:[]],`chore: remove cc-safety-net plugin v${wt()}`),Ar(A,"keep"),{path:le,alreadyInstalled:!0}})}import{existsSync as Bl,mkdirSync as mm,readFileSync as gm}from"node:fs";import{dirname as ym}from"node:path";var oi=jt["antigravity-cli"],sn="cc-safety-net";function an(A){return Boolean(A)&&typeof A==="object"&&!Array.isArray(A)}function Ir(){return{PreToolUse:[{hooks:[{type:"command",command:oi,timeout:30}]}]}}function ql(A){try{let z=JSON.parse(gm(A,"utf-8"));if(!z||typeof z!=="object"||Array.isArray(z))throw Error("Antigravity hooks config must be a JSON object");return z}catch(z){if(z instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${A}: ${z.message}`);throw z}}function Vl(A){let z=A[sn];if(z===void 0){let ee=Ir();return A[sn]=ee,{definition:ee,preToolUse:ee.PreToolUse??[]}}if(!an(z))throw Error(`Antigravity hooks config entry "${sn}" must be an object`);let X=Array.isArray(z.PreToolUse)?z.PreToolUse:[];return z.PreToolUse=X,{definition:z,preToolUse:X}}function zl(A){if(!Array.isArray(A.PreToolUse))return!1;return A.PreToolUse.some((z)=>an(z)&&Array.isArray(z.hooks)&&z.hooks.some((X)=>an(X)&&X.command===oi))}function hm(A){return Object.values(A).some((z)=>an(z)&&z.enabled!==!1&&zl(z))}function vm(A){if(A[sn]===void 0)return!1;let z=Vl(A);if(z.definition.enabled!==!1||!zl(z.definition))return!1;return z.definition.enabled=!0,!0}function bm(A){if(A[sn]===void 0){A[sn]=Ir();return}let z=Vl(A);z.definition.enabled=!0,z.preToolUse.push(Ir().PreToolUse?.[0]??{hooks:[]})}function Lm(A){let z=!1;for(let X of Object.values(A)){if(!an(X)||!Array.isArray(X.PreToolUse))continue;X.PreToolUse=X.PreToolUse.flatMap((ee)=>{if(!an(ee)||!Array.isArray(ee.hooks))return[ee];let te=ee.hooks.filter((ae)=>!an(ae)||ae.command!==oi);if(te.length!==ee.hooks.length)z=!0;return te.length===0?[]:[{...ee,hooks:te}]})}return z}function $r(A,z){kt(A,`${JSON.stringify(z,null,2)}
`)}function Jl(A){let z=Pn(A.home);if(mm(ym(z),{recursive:!0}),!Bl(z))return $r(z,{[sn]:Ir()}),{path:z,alreadyInstalled:!1};let X=ql(z);if(hm(X))return{path:z,alreadyInstalled:!0};if(vm(X))return $r(z,X),{path:z,alreadyInstalled:!1};return bm(X),$r(z,X),{path:z,alreadyInstalled:!1}}function Wl(A){let z=Pn(A.home);if(!Bl(z))return{path:z,alreadyInstalled:!1};let X=ql(z);if(!Lm(X))return{path:z,alreadyInstalled:!1};return $r(z,X),{path:z,alreadyInstalled:!0}}import{existsSync as wm,readdirSync as km,rmSync as xm}from"node:fs";import{join as Cm}from"node:path";function Kl(A,z=process.platform,X){if(!wm(A))return;let ee=z==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);km(A).filter((te)=>te!==X&&ee.test(te)).forEach((te)=>{xm(Cm(A,te),{recursive:!0,force:!0})})}import{spawn as Sm}from"node:child_process";var Mt=Tt.map((A)=>({target:A.id,flag:A.flag,label:bt(A.id),probeCommand:A.probeCommand}));function ii(A){let z=new Set(A);return Mt.map((X)=>X.target).filter((X)=>z.has(X))}async function Yl(A,z){for(let X of A)await z(X)}var Rm=5000;function si(A,z=Rm){return new Promise((X)=>{let ee=Xt([...A],process.env),te=Sm(ee.cmd,ee.args,{env:process.env,stdio:"ignore"}),ae=!1,le=(he)=>{if(ae)return;ae=!0,clearTimeout(ye),X(he)},ye=setTimeout(()=>{te.kill(),le(!1)},z);te.on("error",()=>le(!1)),te.on("close",(he)=>le(he===0))})}function Zl(A=si,z={}){let X=new Set(z.configuredTargets??[]);return Promise.all(Mt.map(async(ee)=>({target:ee.target,flag:ee.flag,label:ee.label,...Ql(z.action,await A(ee.probeCommand),X.has(ee.target))})))}function Xl(A,z){let X=new Set(z.configuredTargets??[]);return A.map((ee)=>({...ee,...Ql(z.action,ee.available,X.has(ee.target))}))}function Ql(A,z,X){if(A==="uninstall")return X?{available:!0}:{available:!1,unavailableReason:"not installed"};if(A==="install"&&X)return{available:!1,unavailableReason:"already installed"};if(!z)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}import{existsSync as ec,readdirSync as Pm,rmSync as Em}from"node:fs";import{join as xn}from"node:path";function Or(A,z=process.platform){let X=xn(A.env.get("npm_config_cache")||(z==="win32"?xn(A.env.get("LOCALAPPDATA")||xn(A.home,"AppData","Local"),"npm-cache"):xn(A.home,".npm")),"_npx");if(!ec(X))return;Pm(X).filter((ee)=>ec(xn(X,ee,"node_modules","cc-safety-net"))).forEach((ee)=>{Em(xn(X,ee),{recursive:!0,force:!0})})}import{existsSync as sc,mkdirSync as Am,readFileSync as ac}from"node:fs";import{dirname as _m,join as ic}from"node:path";function Dm(A,z){if(A[z]!=="#")return z;let X=A.indexOf(`
`,z+1);return X===-1?A.length:X+1}function ai(A,z,X){let ee=new RegExp(`^(\\s*)${z}\\s*=\\s*\\[`),te=0;for(let ae of A.split(`
`)){if(/^\s*\[/.test(ae))return;let le=ee.exec(ae);if(le){let ye=te+le[0].lastIndexOf("[");return{start:ye,end:yo(A,ye,{skipComment:Dm,...X})}}te+=ae.length+1}return}function tc(A,z,X){let ee=A.slice(0,z.end).trimEnd(),te=Js(A,z.end),ae=te===""?"     ":`${te}  `,le=!ee.endsWith("[")&&!ee.endsWith(",");return`${ee}${le?",":""}
${ae}${X}${A.slice(z.end)}`}function nc(A,z,X){let ee=A.indexOf(X,z.start);if(ee===-1||ee>z.end)return A;return fr(A,{start:ee,end:ee+X.length})}function rc(A,z){let X=new RegExp(`^\\s*${z}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),ee=A.split(`
`),te=ee.findIndex((ye)=>/^\s*\[/.test(ye)),ae=te===-1?ee:ee.slice(0,te),le=te===-1?[]:ee.slice(te);return[...ae.filter((ye)=>!X.test(ye)),...le].join(`
`)}function oc(A,z,X){let ee=new RegExp(`^\\s*\\[\\[${z}]]\\s*$`,"m");return A.split(/(?=^\s*\[)/m).filter((te)=>!ee.test(te)||!te.includes(X)).join("").trimEnd()}var Hn=jt["kimi-code"],li=`[[hooks]]
event = "PreToolUse"
command = "${Hn}"`,lc=`{ event = "PreToolUse", command = "${Hn}" }`,cc={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function dc(A){return ic(A.env.get("KIMI_CODE_HOME")??ic(A.home,".kimi-code"),"config.toml")}function Tm(A){let z=ai(A,"hooks",cc);if(z&&A.slice(z.start+1,z.end).trim())return tc(A,z,lc);let X=rc(A,"hooks").trimEnd();if(X==="")return`${li}
`;return`${X}

${li}
`}function uc(A){let z=dc(A);if(Am(_m(z),{recursive:!0}),!sc(z))return kt(z,`${li}
`),{path:z,alreadyInstalled:!1};let X=ac(z,"utf-8");if(X.includes(Hn))return{path:z,alreadyInstalled:!0};return kt(z,Tm(X)),{path:z,alreadyInstalled:!1}}function pc(A){let z=dc(A);if(!sc(z))return{path:z,alreadyInstalled:!1};let X=ac(z,"utf-8");if(!X.includes(Hn))return{path:z,alreadyInstalled:!1};let ee=ai(X,"hooks",cc),te=ee?nc(X,ee,lc):`${oc(X,"hooks",Hn)}
`;return kt(z,te),{path:z,alreadyInstalled:!0}}var di="safety-net@cc-marketplace",fc=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),mc=new Set(["antigravity-cli","cursor","grok-build","hermes-agent","kimi-code"]);function pi(A){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(A??"")}function bc(A){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(A??"")}function $m(A){return/^Marketplace `cc-marketplace`\s*$/m.test(A??"")}var Lc={"claude-code":{installCommands:(A)=>{let z=ur(A,"cc-safety-net@cc-marketplace");return{commands:[...z?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...mo(A).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:ur(A,di)?[["claude","plugin","uninstall",di]]:[],update:z}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(A,z)=>{let X=z??await Nt(["codex","plugin","list"]),ee=bc(X);return{commands:[ee||$m(X)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:pi(X)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:ee}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:"Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."},"copilot-cli":{installCommands:async()=>{let A=await Nt(["copilot","plugin","list"]),z=[...ta(A)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...na(A)?[["copilot","plugin","uninstall",Xs]]:[]];if(Qs(A))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",Ft]],cleanupCommands:z,update:!0};return{commands:[ea(await Nt(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",Ft]],cleanupCommands:z}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(A)=>{let z=xo(A);if(z.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(z.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:No,installCommands:()=>({commands:Ba()}),uninstallCommands:[["openclaw","plugins","uninstall",ht,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{beforeInstall:Uo,installCommands:[["opencode","plugin","-g","-f","cc-safety-net@latest"]]},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]}};function wc(A,z=(X)=>X){try{let X=JSON.parse(z(vc(A,"utf-8")));if(!X||typeof X!=="object"||Array.isArray(X))throw Error(`Settings file ${A} must be a JSON object`);return X}catch(X){if(X instanceof SyntaxError)throw Error(`Failed to parse ${A}: ${X.message}`);throw X}}function Im(A){let z=ci(En(A),"settings.json");if(!ui(z))return;let X=wc(z,At),ee=X.enabledPlugins;if(!ee||typeof ee!=="object"||Array.isArray(ee))return;if(ee[Ft]!==!1)return;let te=vc(z,"utf-8"),ae=te.replace(new RegExp(`("${Ft}"\\s*:\\s*)false`),"$1true");return ee[Ft]=!0,kt(z,ae!==te?ae:`${JSON.stringify(X,null,2)}
`),`Enabled ${Ft} plugin in ${z}`}function Om(A){let z=Go(A);if(!ui(z))return;let X=wc(z);if(!Array.isArray(X.packages))return;let ee=X.packages.find((te)=>!!te&&typeof te==="object"&&!Array.isArray(te)&&Bo(te.source)&&("extensions"in te));if(!ee)return;return delete ee.extensions,kt(z,`${JSON.stringify(X,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${z}`}function gc(A,z){let X=xt({label:z,booleans:Object.fromEntries(Mt.map((ae)=>[ae.target,[ae.flag]]))},A),ee=X.errors[0];if(ee)throw Error(ee);let te=Mt.filter((ae)=>X.flags[ae.target]).map((ae)=>ae.target);if(te.length!==1)throw Error(`Choose exactly one ${z} target: ${Mt.map((ae)=>ae.flag).join(", ")}`);return te[0]}async function kc(A,z=fn){let[X,ee,te]=await Promise.all([z(["amp","plugins","list"],30000),z(["codex","plugin","list"],30000),z(["copilot","--binary-version"])]);return{codexPluginListOutput:ee,hooks:bn(A,process.cwd(),{ampPluginListOutput:X,codexPluginListOutput:ee,copilotCliVersion:te})}}async function Fm(A,z,X=fn){let ee=await kc(A,X);return ee.hooks.filter((te)=>z==="install"?te.configured:te.detected||te.inspectionStatus==="not-inspected").filter((te)=>te.platform!=="codex"||!pi(ee.codexPluginListOutput)||bc(ee.codexPluginListOutput)).map((te)=>te.platform)}function jm(A,z,X,ee){if(X.length>0)return{finish:async()=>[gc(X,z)]};if(!ee.selectTargets&&!Qo(ee.input,ee.output))return{finish:async()=>[gc(X,z)]};let te=ee.detectConfiguredTargets??(()=>Fm(A,z,ee.fetchVersion)),ae=Promise.all([Zl(ee.probeTargets),te()]);return{ready:ae,finish:async()=>{let[le,ye]=await ae,he=Xl(le,{action:z,configuredTargets:ye}),ve=ee.selectTargets?await ee.selectTargets(z,hc(z,he)):await Tl(z,hc(z,he),{input:ee.input,output:ee.output});if(ve==="update")return ve;if(!ve||ve.length===0)return null;return ii(ve)}}}async function Nm(A,z,X=!1,ee){let te=Lc[A];te.beforeInstall?.(z);let ae=typeof te.installCommands==="function"?await te.installCommands(z,ee):{commands:te.installCommands};return await Io(ae.commands),await Na(ae.cleanupCommands??[]),[`${ae.update||X?"Updated":"Installed"} ${bt(A)} integration`,te.postInstallMessage].filter(Boolean).join(`
`)}async function Mm(A){let z=Lc[A];if(!z.uninstallCommands)throw Error(`${bt(A)} uninstall is not supported`);return await Io(z.uninstallCommands),`Uninstalled ${bt(A)} integration`}function Hm(A){let z=ol(A);return z.alreadyInstalled?`Uninstalled OpenCode plugin from ${z.path}`:`OpenCode plugin not installed in ${z.path}`}var xc={"antigravity-cli":{install:Jl,uninstall:Wl},cursor:{install:pa,uninstall:fa},"grok-build":{install:xa,uninstall:Ca},"kimi-code":{install:uc,uninstall:pc}};function Um(A,z,X,ee=!1){if(A==="install"&&!ee)Or(X);let te=xc[z][A](X),ae=bt(z),le=A!=="install"?"Uninstalled":ee?"Updated":"Installed";return A==="install"&&te.alreadyInstalled?ee?`${ae} hook up to date in ${te.path}`:`${ae} hook already installed in ${te.path}`:A==="uninstall"&&!te.alreadyInstalled?`${ae} hook not installed in ${te.path}`:`${le} ${ae} hook ${A==="install"?"in":"from"} ${te.path}`}var Cc={amp:{install:Ul,uninstall:Gl,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:Ea,uninstall:Da,afterInstall:async(A)=>{let z=_o(A);return await Nt(["hermes","plugins","enable",_t,"--no-allow-tool-override"]),!z},beforeUninstall:async(A)=>{Ao(A);try{await Nt(["hermes","plugins","disable",_t])}catch(z){console.warn(`${z instanceof Error?z.message:String(z)}
Removing the plugin files anyway; ${_t} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Gm(A,z,X,ee=!1){let te=Cc[z];if(A==="uninstall")await te.beforeUninstall?.(X);let ae=A==="install"?await te.install(X):await te.uninstall(X),le=A==="install"&&await te.afterInstall?.(X),ye=bt(z),he=!le&&(A==="install"&&ae.alreadyInstalled||A==="uninstall"&&!ae.alreadyInstalled);return[he?A==="install"?`${ye} plugin ${ee?"up to date":"already installed"} at ${ae.path}`:`${ye} plugin not installed at ${ae.path}`:`${A!=="install"?"Uninstalled":ee?"Updated":"Installed"} ${ye} plugin ${A==="install"?"at":"from"} ${ae.path}`,he?void 0:te.restartNote].filter(Boolean).join(`
`)}var Bm={"copilot-cli":{afterInstall:Im},"hermes-agent":{beforeInstall:(A,z)=>{if(!z)Or(A)}},openclaw:{afterInstall:async()=>{await qa();return},beforeUninstall:No},opencode:{afterInstall:async(A)=>{await nl(A);return}},pi:{afterInstall:Om}};function qm(A){return A in xc}function Vm(A){return A in Cc}var yc=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function zm(A){if($n({environment:A,cwd:process.cwd()}).status!=="configured")return yc;return[yc,"",dt.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function hc(A,z){return z.map((X)=>A==="install"&&X.target==="kimi-code"&&X.unavailableReason==="already installed"?{...X,available:!0,unavailableReason:void 0,label:`${X.label} (global hook installed)`}:X)}function Jm(A,z){if(A.selectKimiInstallMethod)return A.selectKimiInstallMethod();if(!Qo(A.input,A.output))return Promise.resolve("global-hook");return _l({input:A.input,output:A.output,globalHookInstalled:$n({environment:z,cwd:process.cwd()}).status==="configured"})}async function Sc(A,z,X,ee=!1,te){let ae=Bm[z];if(A==="install")ae?.beforeInstall?.(X,ee);if(A==="uninstall")ae?.beforeUninstall?.(X);if(qm(z))return Um(A,z,X,ee);if(Vm(z))return Gm(A,z,X,ee);if(A==="uninstall")return z==="opencode"?Hm(X):Mm(z);return[await Nm(z,X,ee,te),await ae?.afterInstall?.(X)].filter(Boolean).join(`
`)}function Wm(A){let z=xt({label:"update"},A).errors[0];if(z)throw Error(z)}async function Km(A,z=fn){let X=await kc(A,z),ee=ci(En(A),"installed-plugins");return{targets:ii([...X.hooks.filter((ae)=>ae.platform!=="copilot-cli"&&ae.detected).map((ae)=>ae.platform),...[mr,Zs,Ys].flatMap((ae)=>ui(ci(ee,...ae))?["copilot-cli"]:[]),...ur(A,di)?["claude-code"]:[],...pi(X.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:X.codexPluginListOutput}}async function Ym(A){let z=l(),X=A.output??process.stdout,ee=(A.scriptPath??process.argv[1]??"").split(/[\\/]/),te=ee.find((et)=>/^bunx-\d+-/.test(et)),ae=te!==void 0||ee.includes("_npx")?null:(A.checkLatestVersion??Wt)(),le=async()=>{let et=ae&&await ae;if(et?.updateAvailable)X.write(`
Update available: cc-safety-net ${et.currentVersion} → ${et.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},ye=Km(z,A.fetchVersion??fn).then(async(et)=>{let Ee=new Set(et.targets);return{targets:et.targets,codexPluginListOutput:et.codexPluginListOutput,available:new Map(await Promise.all(Mt.filter((at)=>Ee.has(at.target)&&fc.has(at.target)).map(async(at)=>[at.target,await si(at.probeCommand)])))}}),he=await Rn(A.showBanner??!0,()=>({ready:ye,finish:()=>ye}),()=>Sn({input:A.input??process.stdin,output:X}),{loadingMessage:"Checking installed integrations…",output:X}),ve=await Promise.resolve().then(()=>(Kl(z.tmpdir,process.platform,te),null)).catch((et)=>Un(et));if(he.targets.length===0){if(X.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),ve!==null)console.error(ve);return await le(),ve===null?0:1}let be=he.targets.some((et)=>mc.has(et))?await Promise.resolve().then(()=>(Or(z),null)).catch((et)=>Un(et)):null,Ie=await lr(Promise.all(he.targets.map((et)=>{if(fc.has(et)&&!he.available.get(et))return Promise.resolve({message:`${bt(et)} not found; skipped`,failed:!1});if(be!==null&&mc.has(et))return Promise.resolve({message:be,failed:!0});return Sc("install",et,z,!0,he.codexPluginListOutput).then((Ee)=>({message:Ee,failed:!1}),(Ee)=>({message:Un(Ee),failed:!0}))})),{loadingMessage:`Updating ${he.targets.length} integration${he.targets.length===1?"":"s"}…`,output:X}),Xe=ve===null?Ie:[...Ie,{message:ve,failed:!0}];return Xe.forEach((et)=>{et.failed?console.error(et.message):X.write(`${et.message}
`)}),await le(),Xe.some((et)=>et.failed)?1:0}function fi(A,z={}){return Promise.resolve().then(()=>Wm(A)).then(()=>Ym(z)).catch((X)=>(console.error(Un(X)),1))}async function Gn(A,z,X={}){try{let ee=l(),te=await Rn(!0,()=>jm(ee,A,z,X),()=>Sn({input:X.input??process.stdin,output:X.output??process.stdout}),{loadingMessage:A==="install"?"Checking available integrations…":"Checking installed integrations…",output:X.output??process.stdout});if(!te)return(X.output??process.stdout).write(`Cancelled: nothing was ${A}ed.
`),0;if(te==="update")return(X.runUpdate??(()=>fi([],{fetchVersion:X.fetchVersion,input:X.input,output:X.output,showBanner:!1})))();let ae=X.output??process.stdout;return await Yl(te,async(le)=>{if(le==="kimi-code"&&A==="install"){let he=await Jm(X,ee);if(he===null){ae.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(he==="plugin"){ae.write(`${zm(ee)}
`);return}}let ye=await lr(Sc(A,le,ee),{loadingMessage:`${A==="install"?"Installing":"Uninstalling"} ${bt(le)} integration…`,output:ae});ae.write(`${ye}
`)}),0}catch(ee){return console.error(Un(ee)),1}}function Un(A){let z=A instanceof Error?A.message:String(A),X=typeof A==="object"&&A!==null&&"code"in A?A.code:null;if(X==="EACCES"||X==="EPERM")return`${z}
Check file permissions for the target config file and parent directory.`;if(X==="ENOENT")return`${z}
Check that the target config path and parent directory exist.`;if(X==="ENOTDIR")return`${z}
Check that every parent path component is a directory.`;return z}import{mkdirSync as ng}from"node:fs";import{dirname as rg}from"node:path";import{createInterface as og}from"node:readline";import{existsSync as Pc,readFileSync as Zm}from"node:fs";function ln(A,z){let X=Je(A,z);return{policy:X.policy,errors:oe(qe(X.issues,Ye,(ee)=>ee.kind==="custom")," "," ")}}function Bn(A,z){return ln(A,z).errors}function Rc(A,z){return{"safety.level":A.safety.level,...mi("safety.overrides",A.safety.overrides),"workflow.worktree_mode":String(A.workflow.worktree_mode),"destructive_command_protection.enabled":String(A.destructive_command_protection.enabled),...mi("destructive_command_protection.overrides",A.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":gi(A.destructive_command_protection.allow_paths),"secret_protection.enabled":String(A.secret_protection.enabled),...mi("secret_protection.overrides",A.secret_protection.overrides),"secret_protection.deny_paths":gi(A.secret_protection.deny_paths),"secret_protection.allow_paths":gi(A.secret_protection.allow_paths),...z?{"audit.retention_days":String(A.audit.retention_days)}:{}}}function Fr(A,z,X){let ee=Rc(A,X),te=Rc(z,X);return[...new Set([...Object.keys(ee),...Object.keys(te)])].flatMap((ae)=>ee[ae]===te[ae]?[]:[{field:ae,before:ee[ae],after:te[ae]}])}function qn(A,z){let X=d(A,z);if(!Pc(X))return{baseline:x(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,A.home),diagnostics:[]};let ee=cn(X),te=ln(ee.value,A.home);return{baseline:te.policy,diagnostics:ee.errors.length>0?ee.errors:te.errors}}function cn(A){if(!Pc(A))return{errors:[`${A}: file not found`]};try{return{value:JSON.parse(Zm(A,"utf-8")),errors:[]}}catch(z){let X=z instanceof Error?z.message:String(z);return{errors:[`${A}: ${z instanceof SyntaxError?`Invalid JSON: ${X}`:X}`]}}}function jr(A,z){let X=Xm(A)?A:{};return{version:z.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((ee)=>X[ee]!==void 0).map((ee)=>[ee,X[ee]]))}}function mi(A,z){return Object.fromEntries(Object.entries(z).flatMap(([X,ee])=>ee===void 0?[]:[[`${A}.${X}`,String(ee)]]))}function gi(A){return A.length===0?"(none)":A.join(", ")}function Xm(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}import{chmodSync as Qm,existsSync as Ec,mkdirSync as eg,readFileSync as Dc}from"node:fs";import{dirname as tg}from"node:path";function Ac(A,z={}){let X=d(A,z);if(!Ec(X))return{path:X,exists:!1,raw:"",policy:W(),errors:[]};let ee=Dc(X,"utf-8");if(!ee.trim())return{path:X,exists:!0,raw:ee,policy:W(),errors:["Config file is empty"]};try{let te=ln(JSON.parse(ee),A.home);return{path:X,exists:!0,raw:ee,policy:te.policy,errors:te.errors}}catch(te){return{path:X,exists:!0,raw:ee,policy:W(),errors:[`Invalid JSON: ${te instanceof Error?te.message:String(te)}`]}}}function Vt(A,z,X={}){let ee=d(A,X),te=ln(z,A.home);if(te.errors.length>0)return{path:ee,policy:W(),errors:te.errors};let ae=te.policy;return eg(tg(ee),{recursive:!0,mode:448}),g(ne(ee),`${JSON.stringify(ae,null,2)}
`,384),Qm(ee,384),{path:ee,policy:ae,errors:[]}}function _c(A,z){let X=ln(z,A.home);if(X.errors.length>0)return{errors:X.errors};return{preview:Te(X.policy,A.env),errors:[]}}function Tc(A,z={}){let X=d(A,z);if(!Ec(X))return Vt(A,J,z);let ee=Dc(X,"utf-8");if(!ee.trim())return Vt(A,J,z);try{return Vt(A,x(JSON.parse(ee),A.home),z)}catch{return Vt(A,J,z)}}var $c=new Set(["check","apply"]),Ic="(unset)";async function Fc(A,z,X={}){let ee=xt({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},z),te=ee.positionals[0],ae=[...ee.errors,...te&&!$c.has(te)?[`Unknown policy subcommand: ${te}`]:[],...te&&$c.has(te)&&!ee.positionals[1]?[`policy ${te} requires a file`]:[],...ee.positionals.slice(2).map((Ee)=>`Unexpected policy argument: ${Ee}`)];if(ae.length>0){for(let Ee of ae)console.error(Ee);return 1}let le=ee.positionals[1];if(!te||!le)return Ln(Zn,console.error),1;let ye=ee.flags.global?d(A):v(X.cwd??process.cwd()),he=cn(le),ve=[...he.errors,...Bn(he.value,A.home).map((Ee)=>`${le}: ${Ee}`),...!ee.flags.global&&ag(he.value)&&he.value.audit!==void 0?[`${le}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(ve.length>0){for(let Ee of ve)console.error(Ee);return 1}let be=x(he.value,A.home);if(console.log(`Scope: ${ee.flags.global?"user":"project"} (${ye})`),console.log(`Proposal: ${le}`),ee.flags.global)Oc(x(cn(ye).value,A.home),be,!0);if(!ee.flags.global){let Ee=qn(A).baseline;console.log("Effective policy (user + project merged):"),Oc(Y(Ee,se(cn(ye).value,A.home).policy).policy,Y(Ee,se(he.value,A.home).policy).policy,!1)}if(te==="check")return 0;let Ie=X.input??process.stdin,Xe=X.output??process.stdout;if(!Ie.isTTY||!Xe.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${le}${ee.flags.global?" --global":""}`),1;if(!await ig(`Apply this policy to ${ye}? [y/N] `,Ie,Xe))return console.log("Cancelled; nothing was written."),0;return sg(A,ye,he.value,be,ee.flags.global),console.log(`Policy applied: ${ye}`),0}function ig(A,z,X){let ee=og({input:z,output:X,terminal:!1});return new Promise((te)=>{ee.once("close",()=>te(!1)),ee.question(A,(ae)=>{te(/^y(es)?$/i.test(ae.trim())),ee.close()})})}function sg(A,z,X,ee,te){if(te){Vt(A,ee);return}ng(rg(z),{recursive:!0}),Rt(z,jr(X,ee))}function Oc(A,z,X){let ee=Fr(A,z,X);if(ee.length===0){console.log("No changes.");return}console.log(`Changes (${ee.length}):`);for(let te of ee)console.log(`  ${te.field}: ${te.before??Ic} -> ${te.after??Ic}`)}function ag(A){return!!A&&typeof A==="object"&&!Array.isArray(A)}import{join as Ly}from"node:path";var jc="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- Transparent wrappers have no built-in defaults. Configure only wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function Nr(A,z){if(!A.ok){Gc(A);return}Hc(A,z)}function Mc(A,z,X){if(A.ok)console.log(X);if(!A.add){Nr(A,`Added rulebook source: ${z}`);return}if(!A.ok){Gc(A);return}if(A.add.added.length>0)console.log(`Added ${A.add.added.length} ${A.add.added.length===1?"rulebook":"rulebooks"} from ${A.add.source} at ${A.add.ref}:`),A.add.added.forEach((ee)=>{console.log(`  - ${ee}`)});if(A.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${A.add.source} at ${A.add.ref}: ${A.add.alreadyConfigured.join(", ")}`);if(A.add.commits.length>0)console.log(`Vendored at ${A.add.commits.map((ee)=>ee.slice(0,7)).join(", ")}.`);Hc(A,"Rule config updated.")}function Hc(A,z){for(let X of A.changes??[])console.log(X);console.log(z),console.log(""),lg(A.entries)}function lg(A){if(A.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${A.length}):`);for(let z of A)console.log(`  - ${z.name} ${z.version} (${cg(z.ruleCount)})`),console.log(`    Source: ${z.spec}`)}function cg(A){return`${A} ${A===1?"rule":"rules"}`}function Uc(A){dn("Active sources",A.rulebooks,(z)=>[`[${z.source}] ${z.name} ${z.version}`,`  Source: ${z.spec}`]),dn("Active rules",A.rules,(z)=>[`[${ug(A,z.name)}] ${z.name}`,...dg(z),`  Reason: ${z.reason}`]),dn("Disabled rules",Nc(A,"off"),(z)=>[z.key]),dn("Reason overrides",Nc(A,"reason"),(z)=>[z.key,`  Reason: ${z.value.reason}`]),dn("Transparent wrappers",A.transparent_wrappers,(z)=>[z]),dn("Issues",A.errors,(z)=>[z]),dn("Warnings",A.warnings,(z)=>[z])}function dn(A,z,X){if(z.length===0){console.log(`${A}: (none)`);return}console.log(`${A} (${z.length}):`);for(let ee of z){let[te,...ae]=X(ee);console.log(`  - ${te}`);for(let le of ae)console.log(`    ${le}`)}}function dg(A){if(!A.match)return[`  Command: ${A.subcommand?`${A.command} ${A.subcommand}`:A.command}`,`  Block args: ${A.block_args.join(", ")}`];return[`  Command: ${[A.command,...A.match.command_path].join(" ")}`,...A.match.any_args?[`  Any args: ${A.match.any_args.join(", ")}`]:[],...A.match.exclude_args?[`  Exclude args: ${A.match.exclude_args.join(", ")}`]:[]]}function ug(A,z){return A.rulebooks.find((X)=>X.rules.includes(z))?.source??"project"}function Nc(A,z){return Object.entries({...A.userConfig?.overrides??{},...A.projectConfig?.overrides??{}}).filter((X)=>{if(z==="off")return X[1]==="off";return!!X[1]&&typeof X[1]==="object"}).map(([X,ee])=>({key:X,value:ee}))}function Gc(A){for(let z of A.errors)console.error(z)}import{dirname as ud,join as zr}from"node:path";import{join as Li,resolve as xg}from"node:path";function yi(A){let z=m(A);if(z.errors.length>0)return{ok:!1,result:{ok:!1,errors:z.errors,entries:[]}};return{ok:!0,config:z.config??it}}function Bc(A){Rt(A,{version:1,rules:[],overrides:{},transparent_wrappers:[]})}function qc(A){Rt(A,{rulebook_version:1,name:"example-rules",version:"1.0.0",description:"Project-specific CC Safety Net rules.",author:"project",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Gr}from"node:path";var pg="custom.";function Mr(A){if(A.rulebook_version!==2)return[];let z=A.rules.map((X)=>({name:X.name,command:X.command,block_args:[],match:X.match,reason:X.reason,intent:X.intent}));return(A.tests??[]).flatMap((X,ee)=>{let te=hi(h(X.command));if(te.length===0)return[`tests[${ee}]: could not parse fixture command: ${X.command}`];let ae=te.reduce((le,ye)=>le??_(ye,z)?.id.slice(pg.length),void 0);if(X.expect==="blocked"){if(ae===X.rule)return[];let le=ae?`"${ae}" matched first`:"no rule matched";return[`tests[${ee}]: expected "${X.rule}" to block "${X.command}" but ${le}`]}return ae?[`tests[${ee}]: expected "${X.command}" to be allowed but "${ae}" matched`]:[]})}function hi(A){return A.nodes.flatMap((z)=>{if(z.kind==="group"||z.kind==="function")return hi(z.body);if(z.kind!=="command")return[];let X=ge(Z(z.dialect,z.words)).words.map(t);return[...X.length>0?[X]:[],...z.nested.flatMap((ee)=>hi(ee))]})}var Hr=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function Ur(A={}){return{requests:0,responseBytes:0,maxRequests:A.maxRequests??Hr.maxRequests,maxResponseBytes:A.maxResponseBytes??Hr.maxResponseBytes}}function zt(A){return{controller:new AbortController,budget:Ur(),resolveUrl:A}}function Vc(A){return A instanceof Error&&A.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function zc(A){if(A.requests>=A.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");A.requests++}function Jc(A,z){if(z>A.maxResponseBytes-A.responseBytes)throw A.responseBytes+=z,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");A.responseBytes+=z}var Yc=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function Wc(A,z,X=w(Gr(Gr(z)),"rules policy"),ee=zt()){if(C(A))return yg(A,ee);return gg(A,z,X)}async function Zc(A,z,X,ee,te,ae){if(!C(A))return Wc(A,z,X,ee);let le=te?null:fg(A,z,X);if(le)return le;if(!te&&!ae)throw Error(`${A} is not vendored; run rule update ${A} to vendor it`);return Wc(A,z,X,ee)}function fg(A,z,X=w(Gr(Gr(z)),"rules policy")){let ee=T(A),te=I(z,ee.name),ae=n(i(X,te));if(ae===null)return null;let le=ie(vi(ae,`Invalid rulebook ${te}.`));if(le.name!==ee.name)throw Error(`rulebook name "${le.name}" in ${te} must match "${ee.name}"`);return{spec:A,rulebook:le,content:ae}}async function Xc(A,z={}){if(!V(A))throw Error(`Invalid GitHub repository source: ${A}`);let[X,ee]=A.split("/");if(!X||!ee)throw Error(`Invalid GitHub repository source: ${A}`);if(z.ref!==void 0&&!re(z.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${z.ref}`);let te=z.operation??zt(),ae=z.ref??await mg(X,ee,A,te),le=await ed(X,ee,ae,A,te),ye=await Br(`https://api.github.com/repos/${X}/${ee}/git/trees/${le}?recursive=1`,"tree",te),he=ye.response;if(!he.ok)throw Error(`Failed to inspect ${A}: GitHub tree returned ${he.status}`);let ve=JSON.parse(ye.content);if(!Array.isArray(ve?.tree))throw Error(`Failed to inspect ${A}: unexpected GitHub tree response`);let be=ve.tree,Ie=[...new Set(be.flatMap((Xe)=>{if(!Xe||typeof Xe!=="object")return[];let et=Xe;if(et.type!=="blob"||typeof et.path!=="string")return[];let Ee=et.path.match(rt);return Ee?.[1]?[Ee[1]]:[]}))].sort();if(Ie.length===0)throw Error(`No rulebooks found in ${A} under ${ue}/`);return{source:A,owner:X,repo:ee,ref:ae,commit:le,names:Ie}}async function mg(A,z,X,ee){let te=await Br(`https://api.github.com/repos/${A}/${z}`,"metadata",ee),ae=te.response;if(!ae.ok)throw Error(`Failed to inspect ${X}: GitHub returned ${ae.status}`);let ye=JSON.parse(te.content)?.default_branch;if(typeof ye!=="string"||ye==="")throw Error(`Failed to inspect ${X}: missing default branch`);if(!re(ye))throw Error(`GitHub returned an invalid default branch: ${ye}`);return ye}function gg(A,z,X){ot(A);let ee=I(z,A),te=n(i(X,ee));if(te===null)throw Error(`Rulebook source not found: ${A}`);let ae=Qc(vi(te,"Invalid local rulebook source."));if(ae.name!==A)throw Error(`rulebook name "${ae.name}" must match local source "${A}"`);return{spec:A,rulebook:ae,content:te}}async function yg(A,z){let X=T(A),ee=await ed(X.owner,X.repo,X.ref,A,z),te=await Br(`https://raw.githubusercontent.com/${X.owner}/${X.repo}/${ee}/${X.path}`,"raw",z),ae=te.response;if(!ae.ok)throw Error(`Failed to fetch ${A}: GitHub raw returned ${ae.status}`);let le=te.content,ye=Qc(vi(le,"Invalid GitHub rulebook response."));if(ye.name!==X.name)throw Error(`rulebook name "${ye.name}" must match GitHub source "${X.name}"`);return{spec:A,rulebook:ye,content:le}}function Qc(A){let z=ie(A),X=Mr(z);if(X.length>0)throw Error(X.join("; "));return z}function vi(A,z){try{return JSON.parse(A)}catch{throw Error(z)}}async function ed(A,z,X,ee,te){let ae=await Br(`https://api.github.com/repos/${A}/${z}/commits/${encodeURIComponent(X)}`,"commit",te),le=ae.response;if(!le.ok)throw Error(`Failed to resolve ${ee}: GitHub returned ${le.status}`);let ye=JSON.parse(ae.content);if(typeof ye?.sha!=="string"||ye.sha==="")throw Error(`Failed to resolve commit for ${ee}`);return ye.sha}async function hg(A,z,X={}){if(X.signal?.aborted)throw X.signal.reason;let ee=X.budget??Ur(),te=new AbortController,ae=()=>te.abort(X.signal?.reason);X.signal?.addEventListener("abort",ae,{once:!0});let le=!1,ye=setTimeout(()=>{if(te.signal.aborted)return;le=!0,te.abort()},X.timeoutMs??Yc.timeoutMs);try{if(X.signal?.aborted)throw X.signal.reason;zc(ee);let he=await fetch(A,{signal:te.signal,redirect:"error"});if(!he.ok)return td(he),{response:he,content:""};return{response:he,content:await vg(he,z,ee,()=>te.abort())}}catch(he){if(le)throw Error("GitHub request timed out",{cause:he});if(X.signal?.aborted)throw X.signal.reason;throw he}finally{clearTimeout(ye),X.signal?.removeEventListener("abort",ae)}}function Br(A,z,X){return hg(X.resolveUrl?.(A)??A,z,{budget:X.budget,signal:X.controller.signal})}async function vg(A,z,X=Ur(),ee){let te=Yc[`${z}Bytes`],ae=Number(A.headers.get("content-length"));if(Number.isFinite(ae)&&ae>te)throw td(A),Error(`GitHub ${z} response exceeds ${te} bytes`);if(!A.body)return"";let le=A.body.getReader(),ye=[],he=0;while(!0){let ve=await le.read();if(ve.done)break;try{Jc(X,ve.value.byteLength)}catch(be){throw ee?.(),Kc(le),be}if(he+=ve.value.byteLength,he>te)throw ee?.(),Kc(le),Error(`GitHub ${z} response exceeds ${te} bytes`);ye.push(Buffer.from(ve.value))}return Buffer.concat(ye,he).toString("utf-8")}function td(A){if(!A.body)return;nd(()=>A.body?.cancel())}function Kc(A){nd(()=>A.cancel())}function nd(A){try{Promise.resolve(A()).catch(()=>{})}catch{}}var bg=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function rd(A,z){let X=sd(A.rules,z);if(X.length>0)return{ok:!0,specs:X};return id(A.rules,z)}function od(A,z){let X=sd(A,z);if(X.length>0)return{ok:!0,specs:X};let ee=wg(A,z);if(ee.length>0)return{ok:!0,specs:ee};let te=kg(A,z);if(!te.ok)return te;if(te.specs.length>0)return{ok:!0,specs:te.specs};return id(A,z)}function id(A,z){let X=A.filter((ee)=>bi(ee)?.name===z);if(X.length===1)return{ok:!0,specs:X};return Lg(z,X)}function Lg(A,z){return{ok:!1,result:{ok:!1,errors:z.length===0?[`No configured rulebook matches ${A}`]:[`Ambiguous rulebook match ${A}: ${z.join(", ")}`],entries:[]}}}function sd(A,z){return A.filter((X)=>X===z)}function wg(A,z){let X=z.match(bg),ee=X?.[1],te=X?.[2],ae=X?.[3];if(!ee||!te||!ae||!re(ae))return[];return ad(A,(le)=>le.owner===ee&&le.repo===te&&le.ref===ae)}function kg(A,z){if(!V(z))return{ok:!0,specs:[]};let[X,ee]=z.split("/"),te=ad(A,(le)=>le.owner===X&&le.repo===ee);if(new Set(te.map((le)=>bi(le)?.ref).filter((le)=>!!le)).size<2)return{ok:!0,specs:te};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${z}. Use an explicit ref:`,`  cc-safety-net rule remove ${z}#<ref>`],entries:[]}}}function bi(A){try{return T(A)}catch{return null}}function ad(A,z){return A.filter((X)=>{let ee=bi(X);return ee?z(ee):!1})}async function Vr(A,z={}){let X=wi(z);return Cg(A,X,await qr(A,X,zt()))}function Cg(A,z,X){if(!X.ok)return X;let ee=Pt(A,z),te=[...new Set(j(ee.configPath,ee.filesystemScope))];if(te.length===0)return X;return{ok:!1,errors:te,entries:X.entries}}async function qr(A,z,X,ee={},te=new Set,ae=new Set){try{let le=Pt(A,z),ye=yi(le.configTarget);if(!ye.ok)return ye.result;let he=ye.config,ve=z.only?rd(he,z.only):{ok:!0,specs:he.rules};if(!ve.ok)return ve.result;let be=new Set([...z.refresh?ve.specs:[],...te]),Ie=(ut)=>Zc(ut,le.configDir,le.filesystemScope,X,be.has(ut),!z.refresh||be.has(ut)),Xe=await Og(he.rules,z.refresh?(ut)=>Ie(ut).then((vt)=>({ok:!0,item:vt})).catch((vt)=>{if(Vc(vt))throw vt;return{ok:!1,spec:ut,message:vt instanceof Error?vt.message:String(vt)}}):async(ut)=>({ok:!0,item:await Ie(ut)}),X),et=Xe.filter((ut)=>!ut.ok),Ee=Xe.filter((ut)=>ut.ok).map((ut)=>ut.item),at=Ee.flatMap((ut)=>Sg(ut,he.rules)),ct=Ee.flatMap((ut)=>Rg(ut,ae,le)),lt=new Set([...at,...ct].map((ut)=>ut.spec)),pt=[...et,...at,...ct],mt=[],gt=Eg(mt,()=>Ee.flatMap((ut)=>lt.has(ut.spec)||pt.length>0&&ae.has(ut.spec)?[]:Pg(ut,le,ee,mt)));return{ok:pt.length===0,errors:pt.map((ut)=>`Failed to update ${ut.spec}: ${ut.message}`),entries:Ee.map(Ag),changes:gt}}catch(le){return zn(le)}}function Sg(A,z){if(!C(A.spec))return[];let X=Ae(A.spec),ee=z.filter((te)=>te!==A.spec&&Ae(te).toLowerCase()===X.toLowerCase());if(ee.length===0)return[];return[{ok:!1,spec:A.spec,message:`rulebook name "${X}" is also claimed by ${ee.join(", ")}; rename one of them`}]}function Rg(A,z,X){if(!z.has(A.spec)||!C(A.spec))return[];let ee=I(X.configDir,A.rulebook.name),te=n(i(X.filesystemScope,ee));if(te===null||te===A.content)return[];return[{ok:!1,spec:A.spec,message:`${ee} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function Pg(A,z,X,ee){if(!C(A.spec))return[];let te=I(z.configDir,A.rulebook.name),ae=i(z.filesystemScope,te),le=n(ae);if(le===A.content)return[];return ee?.push({target:ae,previous:le}),g(ae,A.content,void 0,X._testAfterPolicyRename),Dg(A,le)}function Eg(A,z){try{return z()}catch(X){for(let ee of[...A].reverse()){if(ee.previous===null){N(ee.target);continue}g(ee.target,ee.previous)}throw X}}function Dg(A,z){if(z===null)return[`Vendored ${A.spec} (${A.rulebook.version})`];let X=me(z),ee="problem"in X?null:X.rulebook,te=new Map(ee?.rules.map((le)=>[le.name,JSON.stringify(le)])??[]),ae=new Set(A.rulebook.rules.map((le)=>le.name));return[`Updated ${A.spec} (${ee?.version??"unreadable"} -> ${A.rulebook.version})`,...[...ae].filter((le)=>!te.has(le)).map((le)=>`  + ${le}`),...[...te.keys()].filter((le)=>!ae.has(le)).map((le)=>`  - ${le}`),...A.rulebook.rules.filter((le)=>{let ye=te.get(le.name);return ye!==void 0&&ye!==JSON.stringify(le)}).map((le)=>`  ~ ${le.name}`)]}function Ag(A){return{spec:A.spec,name:A.rulebook.name,version:A.rulebook.version,ruleCount:A.rulebook.rules.length}}async function ld(A,z,X={}){return _g(A,z,jg(X),zt())}async function _g(A,z,X,ee,te={}){let ae=null,le=!1;try{let ye=Pt(A,X),he=n(ye.configTarget);ae={target:ye.configTarget,content:he};let ve=yi(ye.configTarget);if(!ve.ok)return ve.result;let be=ve.config,Ie=V(z);Tg(z,X,Ie);let Xe=Ie?await Xc(z,{ref:X.ref,operation:ee}):null,et=Xe?$g(Xe,X.rulebooks):[],Ee=Xe?et.map((mt)=>Ig(be.rules,Xe,mt)??`${z}#${Xe.ref}/${mt}`):[z],at=Ee.filter((mt)=>!be.rules.includes(mt)),ct=[...be.rules,...at];if(ct.length>pe)return Fg();if(ct.length!==be.rules.length)le=!0,Rt(ye.configTarget,{version:1,rules:ct,overrides:be.overrides??{},transparent_wrappers:be.transparent_wrappers??[]},void 0,te._testAfterPolicyRename);let lt=await qr(A,X,ee,te,new Set(at),new Set(at));if(!lt.ok)Vn(ye.configTarget,he);if(!lt.ok||!Xe)return lt;let pt=et.filter((mt,gt)=>at.includes(Ee[gt]??""));return{...lt,add:{source:z,ref:Xe.ref,selected:et,added:pt,alreadyConfigured:et.filter((mt)=>!pt.includes(mt)),commits:at.length>0?[Xe.commit]:[]}}}catch(ye){if(le&&ae)try{Vn(ae.target,ae.content)}catch(he){return zn(he)}return zn(ye)}}function Tg(A,z,X){if(!X&&z.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!X&&z.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${A}`);if(z.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let ee=z.rulebooks?.filter((te)=>!c.test(te))??[];if(ee.length>0)throw Error(`Invalid rulebook names: ${ee.join(", ")}`)}function $g(A,z){let X=z?[...new Set(z)]:A.names,ee=X.filter((te)=>!A.names.includes(te));if(ee.length>0)throw Error(`Rulebooks not found in ${A.source} at ${A.ref}: ${ee.join(", ")}
Available rulebooks: ${A.names.join(", ")}`);return X}function Ig(A,z,X){let ee=`${z.source}#${z.ref}/${X}`;if(A.includes(ee))return ee;let te=`${z.source}#${z.commit}/${X}`;return A.find((ae)=>ae===te)}async function Og(A,z,X=zt()){if(A.length>pe)throw Error(fe);let ee=Array(A.length),te=0,ae,le=Array.from({length:Math.min(A.length,Hr.concurrency)},async()=>{while(!ae){let ye=te;if(ye>=A.length)return;te++;try{ee[ye]=await z(A[ye],ye,X.controller.signal)}catch(he){if(!ae)ae={value:he},te=A.length,X.controller.abort(he);return}}});if(await Promise.all(le),ae)throw ae.value;return ee}function Fg(){return{ok:!1,errors:[fe],entries:[]}}function wi(A){return{cwd:A.cwd,userConfigDir:A.userConfigDir,userConfigPath:A.userConfigPath,projectConfigPath:A.projectConfigPath,global:A.global,only:A.only,refresh:A.refresh}}function jg(A){return{...wi(A),ref:A.ref,rulebooks:A.rulebooks}}function Ng(A){return{...wi(A),deleteSource:A.deleteSource}}async function cd(A,z,X={}){try{return await Mg(A,z,Ng(X),{})}catch(ee){return zn(ee)}}async function Mg(A,z,X,ee){let te=Pt(A,X),ae=m(te.configTarget);if(ae.errors.length>0)return{ok:!1,errors:ae.errors,entries:[]};if(!ae.config)return{ok:!1,errors:[`No config found at ${te.configPath}`],entries:[]};let le=od(ae.config.rules,z);if(!le.ok)return le.result;let ye=X.deleteSource?Hg(te.configDir,le.specs,te.filesystemScope):{ok:!0,dirs:[]};if(!ye.ok)return ye.result;let he=n(te.configTarget);if(he===null)return zn(Error("Rules config is unavailable."));try{Rt(te.configTarget,{version:1,rules:ae.config.rules.filter((Ie)=>!le.specs.includes(Ie)),overrides:ae.config.overrides??{},transparent_wrappers:ae.config.transparent_wrappers??[]},void 0,ee._testAfterPolicyRename)}catch(Ie){throw Vn(te.configTarget,he),Ie}let ve=await qr(A,X,zt(),ee);if(!ve.ok)return Vn(te.configTarget,he),ve;let be=Ug(ye.dirs,ee,te.filesystemScope);if(!be.ok){Vn(te.configTarget,he);let Ie=await qr(A,X,zt(),ee);if(!Ie.ok)return{ok:!1,errors:[...be.result.errors,...Ie.errors],entries:Ie.entries};return be.result}return ve}function Hg(A,z,X){let ee=z.flatMap((ye)=>c.test(ye)?[]:["--delete-source can only delete local rulebook sources"]),te=z.map((ye)=>Li(A,ye)),ae=ee.length>0?[]:te.flatMap((ye)=>dd(ye,X)),le=[...ee,...ae];return le.length>0?{ok:!1,result:{ok:!1,errors:le,entries:[]}}:{ok:!0,dirs:te}}function dd(A,z){let X=xg(A),ee=i(z,X),te=ce(ee);if(!te)return[`Local rulebook source directory not found: ${A}`];let ae=te.find((le)=>le.name==="rulebook.json");if(!ae)return[`Local rulebook source directory is missing rulebook.json: ${A}`];if(ae.kind!=="file")throw new r(z.label);if(n(i(z,Li(X,"rulebook.json"))),te.length>1)return[`Local rulebook source directory contains extra files: ${A}. delete manually if you really want to remove the directory.`];return[]}function Ug(A,z,X){let ee=A.flatMap((te)=>{try{if(!ce(i(X,te)))return[];let ae=dd(te,X);if(ae.length>0)return ae;return Gg(te,z,X),[]}catch(ae){return[`Failed to delete local rulebook source ${te}: ${ae instanceof Error?ae.message:String(ae)}`]}});return ee.length>0?{ok:!1,result:{ok:!1,errors:ee,entries:[]}}:{ok:!0}}function Gg(A,z,X){if(z._testDeleteLocalSourceDir){z._testDeleteLocalSourceDir(A);return}N(i(X,Li(A,de))),nt(i(X,A))}function Vn(A,z){if(z===null){N(A);return}g(A,z)}function zn(A){return{ok:!1,errors:[A instanceof Error?A.message:String(A)],entries:[]}}var Bg=".safety-net.json",qg="~/.cc-safety-net/config.json";async function md(A,z){return[await pd(A,{legacyPath:As({cwd:z.cwd}),configPath:M(z.cwd),defaultRulebookName:"project-rules",migratedFrom:Bg,cleanup:z.cleanup,syncOptions:{cwd:z.cwd}}),await pd(A,{legacyPath:tr(A),configPath:F(A),defaultRulebookName:"user-rules",migratedFrom:qg,cleanup:z.cleanup,syncOptions:{cwd:z.cwd,global:!0}})].every((ee)=>ee)?0:1}async function pd(A,z){let X=Pt(A,z.syncOptions),ee=i(X.filesystemScope,z.legacyPath),te=n(ee);if(te===null)return console.log(`No legacy config found at ${z.legacyPath}`),!0;let ae=zg(te);if(!ae.ok){for(let et of ae.errors)console.error(et);return!1}let le=m(X.configTarget);if(le.errors.length>0){for(let et of le.errors)console.error(et);return!1}let ye=le.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},he=Jg(ud(z.configPath),ye.rules,z.defaultRulebookName,z.migratedFrom,X.filesystemScope),ve=zr(ud(z.configPath),he,"rulebook.json"),be=i(X.filesystemScope,ve),Ie=[fd(X.configTarget),fd(be)],Xe=await Vg(A,z,X.configTarget,be,he,ae.config.rules,ye.rules.includes(he)?ye.rules:[...ye.rules,he],ye.overrides??{},ye.transparent_wrappers??[]);if(!Xe.ok){Yg(Ie);for(let et of Xe.errors)console.error(et);return!1}if(!z.cleanup)return console.log(`Migrated legacy config at ${z.legacyPath}. Legacy file is no longer used.`),!0;if(!Kg(X.configTarget,be,he,z.migratedFrom,ae.config.rules))return console.error(`Migration cleanup verification failed for ${z.legacyPath}`),!1;return N(ee),console.log(`Deleted legacy config at ${z.legacyPath}`),!0}async function Vg(A,z,X,ee,te,ae,le,ye,he){try{return Rt(X,{version:1,rules:le,overrides:ye,transparent_wrappers:he}),Rt(ee,Wg(te,z.migratedFrom,ae)),await Vr(A,z.syncOptions)}catch(ve){return{ok:!1,errors:[ve instanceof Error?ve.message:String(ve)]}}}function zg(A){try{let z=JSON.parse(A),X=no(z);if(X.errors.length>0)return{ok:!1,errors:X.errors};return{ok:!0,config:{version:1,rules:z.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function Jg(A,z,X,ee,te){let ae=z.find((le)=>Zg(i(te,zr(A,le,"rulebook.json")))===ee);if(ae)return ae;if(n(i(te,zr(A,X,"rulebook.json")))===null)return X;for(let le=2;;le++){let ye=`${X}-${le}`;if(n(i(te,zr(A,ye,"rulebook.json")))===null)return ye}}function Wg(A,z,X){return{rulebook_version:1,name:A,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:z,allowed_commands:[...new Set(X.map((ee)=>ee.command))],rules:X,tests:X.map((ee)=>({command:[ee.command,ee.subcommand,ee.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:ee.name}))}}function Kg(A,z,X,ee,te){if(!m(A).config?.rules.includes(X))return!1;try{let le=n(z);if(le===null)return!1;let ye=JSON.parse(le);return ye.migrated_from===ee&&JSON.stringify(ye.rules)===JSON.stringify(te)}catch{return!1}}function fd(A){return{target:A,content:n(A)}}function Yg(A){for(let z of A){if(z.content===null){N(z.target);continue}g(z.target,z.content)}}function Zg(A){let z=n(A);if(z===null)return null;try{let X=JSON.parse(z);return typeof X.migrated_from==="string"?X.migrated_from:null}catch{return null}}import{mkdir as Xg,readFile as Qg,writeFile as ey}from"node:fs/promises";import{dirname as ty,join as ny}from"node:path";var ry=86400000,oy=604800000;async function yd(A,z=Date.now()){if(A.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let X=je(A);if(!X)return null;let ee=ny(X,".cc-safety-net","update-check.json"),te=await iy(ee,z);if(!te.lastCheck||z-te.lastCheck>ry){let ye=await Wt();if(te.lastCheck=z,ye.latestVersion)te.latestVersion=ye.latestVersion;if(!await gd(ee,te))return null;if(ye.error)return null}let ae=te.latestVersion,le=wt();if(!ae||!lo(ae,le))return null;if(te.notifiedVersion===ae&&te.notifiedAt!==void 0&&z-te.notifiedAt<oy)return null;if(te.notifiedVersion=ae,te.notifiedAt=z,!await gd(ee,te))return null;return`UPDATE_AVAILABLE: cc-safety-net v${ae} is available (running v${le}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function iy(A,z){let X=await Qg(A,"utf8").then((ae)=>JSON.parse(ae)).catch(()=>{return});if(!X||typeof X!=="object"||Array.isArray(X))return{};let ee=X,te=(ae)=>typeof ae==="number"&&Number.isFinite(ae)&&ae<=z?ae:void 0;return{lastCheck:te(ee.lastCheck),latestVersion:typeof ee.latestVersion==="string"?ee.latestVersion:void 0,notifiedVersion:typeof ee.notifiedVersion==="string"?ee.notifiedVersion:void 0,notifiedAt:te(ee.notifiedAt)}}async function gd(A,z){return Xg(ty(A),{recursive:!0,mode:448}).then(()=>ey(A,JSON.stringify(z),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as sy,resolve as ki}from"node:path";var hd="CC Safety Net Config",ay="═".repeat(hd.length),ly="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",cy=new Set(["rule.json","rule.lock","cache"]);function vd(A,z={}){try{return dy(A,z)}catch(X){if(X instanceof r)return console.error(X.message),1;throw X}}function dy(A,z){let X=z.cwd??process.cwd(),ee=q(A,{cwd:X}),te=tr(A),ae=Qi(X),le=ki(X,ue),ye=i(ee.userScope,te),he=i(ee.projectScope,ae),ve=!1,be=!1,Ie=[],Xe=[],et=uy(i(ee.projectScope,le));if(fy(),n(ee.userConfigTarget)!==null){let Ee=Jt(ee.userConfigTarget);if(Ee.errors.push(...j(ee.userConfigPath,ee.userScope)),Ie.push({scope:"User",path:ee.userConfigPath,result:Ee,schema:"rules",target:ee.userConfigTarget}),Ee.errors.length>0)ve=!0}if(n(ye)!==null)if(be=!0,n(ee.userConfigTarget)!==null)Xe.push(Jr("user","cleanup"));else{let Ee=ro(ye);if(Ie.push({scope:"User",path:te,result:Ee,schema:"legacy",inactive:!0,target:ye}),Xe.push(Jr("user",Ee.errors.length>0?"fix-or-delete":"migrate")),Ee.errors.length>0)ve=!0}if(n(ee.projectConfigTarget)!==null){let Ee=Jt(ee.projectConfigTarget);if(Ee.errors.push(...j(ee.projectConfigPath,ee.projectScope)),Ie.push({scope:"Project",path:ki(ee.projectConfigPath),result:Ee,schema:"rules",target:ee.projectConfigTarget}),Ee.errors.length>0)ve=!0;if(n(he)!==null)be=!0,Xe.push(Jr("project","cleanup"))}else if(n(he)!==null){be=!0,ve=!0;let Ee=ro(he);Ie.push({scope:"Project",path:ki(ae),result:Ee,schema:"legacy",inactive:!0,target:he}),Xe.push(Jr("project",Ee.errors.length>0?"fix-or-delete":"migrate"))}if(et?.result.errors.length)ve=!0;if(Ie.length===0&&!et)return console.log(`
No config files found. Using built-in rules only.`),0;for(let Ee of Ie)if(Ee.inactive)gy(Ee.scope,Ee.path,Ee.result);else if(Ee.result.errors.length>0)yy(Ee.scope,Ee.path,Ee.result.errors);else{if(Ee.schema==="rules"&&by(Ee.target))console.log(`
Added $schema to ${Ee.scope.toLowerCase()} config.`);my(Ee.scope,Ee.path,Ee.result,Ee.schema)}for(let Ee of Xe)console.error(`
${dt.red(Ee)}`);if(et)if(et.result.errors.length>0)vy(et.path,et.result.errors);else hy(et.path,et.result);if(ve)return console.error(`
Config validation failed.`),1;return console.log(be?`
Configs valid with warnings.`:`
All configs valid.`),0}function Jr(A,z){let X=`legacy ${A} config`;if(z==="cleanup")return`Warning: Legacy ${A} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(z==="migrate")return`Warning: Legacy ${A} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${A} config is no longer supported. Fix or delete the ${X}, then run \`npx -y cc-safety-net rule migrate\`.`}function uy(A){if(ce(A)===null)return null;let z=py(A);if(z.ruleNames.size===0&&z.errors.length===0)return null;return{path:A.path,result:z}}function py(A){let z=[],X=new Set,ee=(ce(A)??[]).filter((te)=>!cy.has(te.name)).sort((te,ae)=>te.name.localeCompare(ae.name));if(ee.length===0)return{errors:z,ruleNames:X};for(let te of ee){if(!c.test(te.name)){z.push(`rulebook directory names must match ${c}: ${te.name}`);continue}if(te.kind!=="directory"){z.push(`${te.name} must be a rulebook directory`);continue}let ae=i(A.scope,sy(A.path,te.name,"rulebook.json")),le=n(ae);if(le===null){z.push(`${te.name}/rulebook.json is required`);continue}try{let ye;try{ye=JSON.parse(le)}catch{z.push(`${te.name}/rulebook.json: invalid JSON`);continue}let he=ie(ye);if(he.name!==te.name){z.push(`rulebook name "${he.name}" must match folder "${te.name}"`);continue}let ve=Mr(he);if(ve.length>0){z.push(...ve.map((be)=>`${te.name}/rulebook.json: ${be}`));continue}X.add(te.name)}catch(ye){z.push(ye instanceof Error?`${te.name}/rulebook.json: ${ye.message}`:`${te.name}/rulebook.json: ${String(ye)}`)}}return{errors:z,ruleNames:X}}function fy(){console.log(hd),console.log(ay)}function my(A,z,X,ee){if(console.log(`
✓ ${A} config: ${z}`),console.log(`  Schema: ${ee==="rules"?"rulebook sources":"legacy inline rules"}`),X.ruleNames.size>0){console.log(`  ${ee==="rules"?"Sources":"Rules"}:`);let te=1;for(let ae of X.ruleNames)console.log(`    ${te}. ${ae}`),te++}else console.log(`  ${ee==="rules"?"Sources":"Rules"}: (none)`)}function gy(A,z,X){if(console.error(`
✗ Legacy ${A.toLowerCase()} config: ${z}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),X.errors.length>0){console.error("  Errors:");let ee=1;for(let te of X.errors)for(let ae of te.split("; "))console.error(`    ${ee}. ${ae}`),ee++;return}if(X.ruleNames.size>0){console.error("  Rules:");let ee=1;for(let te of X.ruleNames)console.error(`    ${ee}. ${te}`),ee++;return}console.error("  Rules: (none)")}function yy(A,z,X){bd(`${A} config`,z,X)}function hy(A,z){console.log(`
✓ GitHub source rules: ${A}`),console.log("  Rulebooks:");let X=1;for(let ee of z.ruleNames)console.log(`    ${X}. ${ee}`),X++}function vy(A,z){bd("GitHub source rules",A,z)}function bd(A,z,X){console.error(`
✗ ${A}: ${z}`),console.error("  Errors:");let ee=1;for(let te of X)for(let ae of te.split("; "))console.error(`    ${ee}. ${ae}`),ee++}function by(A){try{let z=n(A);if(z===null)return!1;let X=JSON.parse(z);if(X.$schema)return!1;return g(A,JSON.stringify({$schema:ly,...X},null,2)),!0}catch(z){if(z instanceof r)throw z;return!1}}var Ld=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),wy=new Set(["add","remove","list"]),ky="cc-safety-net/rulebooks";async function wd(A,z){try{return await xy(A,z)}catch(X){if(X instanceof r)return console.error(X.message),1;throw X}}async function xy(A,z){let X=Sy(z),ee=X.help?Cy(X.positionals):null;if(ee)return Ln(ee),0;if(X.errors.length>0){for(let ye of X.errors)console.error(ye);return 1}let te=X.positionals[0];if(!te)return Ln(pn,console.error),1;let ae=X.positionals[1],le={global:X.global};if(te==="init"){let ye=Pt(A,le);Dy(ye.configTarget);let he=Ly(ye.configDir,"example-rules","rulebook.json"),ve=i(ye.filesystemScope,he);if(X.example&&n(ve)===null)qc(ve);let be=j(ye.configPath,ye.filesystemScope);for(let Ie of be)console.error(Ie);if(be.length>0)return 1;return console.log("Rule config initialized."),0}if(te==="add"){let ye=kd(X);if(!ye)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let he=Pt(A,le),ve=await ld(A,ye,{...le,ref:X.ref,rulebooks:X.only.length>0?X.only:void 0});return Mc(ve,ye,`Scope: ${X.global?"user":"project"} (${he.configDir})`),ve.ok?0:1}if(te==="remove"){if(!ae)return console.error("rule remove requires a source"),1;let ye=await cd(A,ae,{...le,deleteSource:X.deleteSource});return Nr(ye,`Removed rulebook source: ${ae}`),ye.ok?0:1}if(te==="update"){let ye=await Vr(A,{...le,only:ae,refresh:!0});return Nr(ye,"Rule config updated."),ye.ok?0:1}if(te==="sync")return $s(A,{global:X.global});if(te==="list"){let ye=K(A,{cwd:process.cwd()});return Uc(ye),ye.errors.length>0?1:0}if(te==="wrapper")return Ay(A,X);if(te==="migrate")return md(A,{cleanup:X.cleanup,cwd:process.cwd()});if(te==="doc"){console.log(jc);let ye=await yd(A);if(ye)console.error(ye);return 0}if(te==="verify")return vd(A);return 1}function Cy(A){if(A.length===0)return pn;let z=pn.subcommands.filter((ee)=>ee.usage.split(" ")[0]===A[0]);if(z.length===0)return null;if(A.length===1&&z.length>1)return{name:`rule ${A[0]}`,description:`Subcommands of rule ${A[0]}`,usage:`rule ${A[0]} <subcommand>`,subcommands:z,options:[]};let X=A.length===1?z[0]:z.find((ee)=>ee.usage.split(" ")[1]===A[1]);if(!X)return null;return{name:`rule ${A[0]}`,description:X.description,usage:`rule ${X.usage}`,options:A[0]==="add"?Qr:[],examples:A[0]==="add"?eo:void 0}}function Sy(A){let z=xt({label:"rule",booleans:{global:["-g","--global"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},A),X={...z.flags,ref:z.values.ref,only:z.lists.only??[],help:z.help,positionals:z.positionals,errors:z.errors};return Ry(X),X}function Ry(A){let[z]=A.positionals;if(z&&!Ld.has(z))A.errors.push(`Unknown rule subcommand: ${z}`);if(A.deleteSource&&z!=="remove")if(z&&Ld.has(z))A.errors.push(`Unknown option for rule ${z}: --delete-source`);else A.errors.push("--delete-source is only valid with 'rule remove'");if(A.cleanup&&z!=="migrate")A.errors.push(Jn(z,"--cleanup"));if(A.example&&z!=="init")A.errors.push(Jn(z,"--example"));if(A.ref&&z!=="add")A.errors.push(Jn(z,"--ref"));if(A.only.length>0&&z!=="add")A.errors.push(Jn(z,"--only"));if(z==="add")Py(A);if(z==="migrate"){if(A.global)A.errors.push(Jn(z,"--global"));if(A.positionals.length>1)A.errors.push(`Unexpected rule migrate argument: ${A.positionals[1]}`)}else if(z==="wrapper")Ey(A);else if(A.positionals.length>2)A.errors.push(`Unexpected rule argument: ${A.positionals[2]}`);if(z==="list"&&A.global)A.errors.push("Unknown option for rule list: --global")}function kd(A){if(A.positionals[1])return A.positionals[1];if(A.ref||A.only.length>0)return ky;return}function Py(A){let z=kd(A);if(!z)return;if((A.ref||A.only.length>0)&&!V(z)){if(A.ref)A.errors.push(`--ref can only select a ref for an owner/repo source: ${z}`);if(A.only.length>0)A.errors.push("--only can only select rulebooks from an owner/repo source");return}if(A.ref&&!re(A.ref))A.errors.push(`--ref must use valid path segments: ${A.ref}`);let X=A.only.filter((ee)=>!c.test(ee));if(X.length>0)A.errors.push(`Invalid rulebook names: ${X.join(", ")}`)}function Jn(A,z){return A?`Unknown option for rule ${A}: ${z}`:`Unknown option for rule: ${z}`}function Ey(A){let z=A.positionals[1],X=A.positionals[2];if(!z){A.errors.push("rule wrapper requires add, remove, or list");return}if(!wy.has(z)){A.errors.push(`Unknown rule wrapper action: ${z}`);return}if(z==="list"){if(X)A.errors.push(`Unexpected rule wrapper argument: ${X}`);return}if(!X){A.errors.push(`rule wrapper ${z} requires a command`);return}if(A.positionals.length>3)A.errors.push(`Unexpected rule wrapper argument: ${A.positionals[3]}`)}function Dy(A){if(n(A)===null){Bc(A);return}let z=m(A);if(!z.config)return;Rt(A,{version:1,rules:z.config.rules,overrides:z.config.overrides??{},transparent_wrappers:z.config.transparent_wrappers??[]})}async function Ay(A,z){let X=z.positionals[1],ee=z.positionals[2],te=Pt(A,{global:z.global}).configTarget;if(X==="list"){let he=m(te);if(he.errors.length>0){for(let ve of he.errors)console.error(ve);return 1}return _y(he.config?.transparent_wrappers??[]),0}if(!ee||!S.test(ee))return console.error("transparent wrapper must match command pattern"),1;if(Re(ee))return console.error(`reserved command "${ee}" cannot be a wrapper`),1;let ae=m(te);if(ae.errors.length>0){for(let he of ae.errors)console.error(he);return 1}let le=ae.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},ye=X==="add"?[...new Set([...le.transparent_wrappers??[],ee])]:(le.transparent_wrappers??[]).filter((he)=>he!==ee);return Rt(te,{version:1,rules:le.rules,overrides:le.overrides??{},transparent_wrappers:ye}),console.log(X==="add"?`Added transparent wrapper: ${ee}`:`Removed transparent wrapper: ${ee}`),0}function _y(A){if(A.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${A.length}):`);for(let z of A)console.log(`  - ${z}`)}import{sep as jy}from"node:path";import{existsSync as Ty,readFileSync as $y}from"node:fs";import{join as Iy}from"node:path";async function Oy(A){if(A.isTTY)return null;return(await Ue(A).catch(()=>null))?.trim()||null}function Fy(A){let z=A.env.get("CLAUDE_SETTINGS_PATH");if(z)return z;return Iy(A.home,".claude","settings.json")}function xi(A){let z=Fy(A);if(!Ty(z))return!1;try{let X=$y(z,"utf-8"),ee=JSON.parse(X);if(!ee.enabledPlugins)return!1;let te="cc-safety-net@cc-marketplace";if(!(te in ee.enabledPlugins))return!1;return ee.enabledPlugins[te]===!0}catch(X){if(R(o.debug,A.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${z}: ${X instanceof Error?X.message:String(X)}`);return!1}}async function Ci(A,z=process.stdin){let X=xi(A),ee;if(!X)ee="\uD83D\uDEE1️ CC Safety Net ❌";else{let ae=L(A,{cwd:process.cwd()}),le=ae.policy,ye=E(le,A.env),he=Object.values(H(le,ye.capabilities)).some((Ie)=>Ie.changesInherited),ve={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[he?"custom":ye.effectiveLevel],be=(ae.policyScopes?.weakenings.length??0)>0?"\uD83D\uDD3B":"";ee=`\uD83D\uDEE1️ CC Safety Net ${ve}${ye.worktreeMode?"\uD83C\uDF33":""}${be}${ae.state==="degraded"?"⚠️":""}`}let te=await Oy(z);if(te&&!te.startsWith("{"))console.log(`${te} | ${ee}`);else console.log(ee)}function xd(A){let z=L(A,{cwd:process.cwd()}),X=z.policy,ee=E(X,A.env),te=!!process.env.NO_COLOR||!process.stdout.isTTY,ae=Math.min(process.stdout.columns||80,100),le=te?"ok":"✔",ye=te?"OFF":"✘",he=(at,ct)=>{let lt=`  ${at.padEnd(13)}${ct}`;return(lt.length>ae?`${lt.slice(0,ae-1)}…`:lt).replaceAll(ye,dt.red(ye))},ve=Object.values(H(X,ee.capabilities)).some((at)=>at.changesInherited),be=(at)=>at===A.home||at.startsWith(`${A.home}${jy}`)?`~${at.slice(A.home.length)}`:at,Ie={ready:dt.green,degraded:dt.yellow}[z.state],Xe=z.policyScopes?.weakenings??[],et=[...xi(A)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...z.diagnostics],Ee=te?"-":"·";console.log([`${te?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Ie(z.state)}`,"",he("Protection",`destructive ${X.destructiveCommandProtectionEnabled?le:ye}   secrets ${X.secretProtection.enabled?le:ye}`),he("Level",ve?`${ee.effectiveLevel} (customised)`:ee.effectiveLevel),he("Rules",X.rules.length===0?"none active":`${X.rules.length} active`),he("Policy",be(d(A))),...z.policyScopes?[he("Project",be(v(process.cwd())))]:[],...ee.worktreeMode?[he("Worktree","relaxations active")]:[],"",...Xe.length===0?[]:["  Project policy",...Xe.flatMap((at)=>Fn(at,"      ",ae-6).map((ct,lt)=>lt===0?`    ${ct}`:ct)),""],...et.length===0?["  Everything configured is active."]:["  Not active",...et.flatMap((at)=>Fn(at,"      ",ae-6).map((ct,lt)=>lt===0?`    ${Ee} ${ct}`:ct)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as Id}from"node:child_process";import{randomBytes as Jy}from"node:crypto";import{existsSync as Wy}from"node:fs";import{createServer as Ky}from"node:http";import{Writable as Yy}from"node:stream";var Wr=500;function Ny(A){let z=A.filter((te)=>te.decision!=="allow"),X=A.filter((te)=>te.decision==="allow"),ee=Math.min(z.length,Math.max(Wr-X.length,Math.ceil(Wr/2)));return[...z.slice(0,ee),...X.slice(0,Wr-ee)]}function Cd(A,z,X=D(A)){if(X)B(A,X);let ee=(ct)=>new Date(ct.getFullYear(),ct.getMonth(),ct.getDate()).getTime(),te=ee(new Date),ae=new Date(te);ae.setDate(ae.getDate()-(z-1));let le=ae.getTime(),ye=[],he={count:0};for(let ct of X?Yt(X,he):[])for(let lt of un(ct,he)){let pt=new Date(lt.ts).getTime();if(!Number.isFinite(pt))continue;if(pt>=le)ye.push(lt)}ye.sort((ct,lt)=>new Date(lt.ts).getTime()-new Date(ct.ts).getTime());let ve=Array.from({length:z},()=>0),be=Array.from({length:z},()=>0),Ie={},Xe={},et={},Ee=0,at=0;for(let ct of ye){let lt=ct.agent||"unknown";Ie[lt]=(Ie[lt]??0)+1;let pt=Math.round((te-ee(new Date(ct.ts)))/86400000),mt=z-1-pt,gt=pt>=0&&pt<z;if(gt)be[mt]=(be[mt]??0)+1;if(ct.decision!=="allow"){if(Ee++,ct.ruleId)Xe[ct.ruleId]=(Xe[ct.ruleId]??0)+1;let ut=Xr(ct.segment||ct.command);if(ut)et[ut]=(et[ut]??0)+1;if(ct.failureStage)at++;if(gt)ve[mt]=(ve[mt]??0)+1}}return{days:z,logsDir:X,homeDir:A.home,totalInWindow:ye.length,truncated:ye.length>Wr,unreadable:he.count,counts:{blocked:Ee,allowed:ye.length-Ee,agents:Ie,blockedByDay:ve,analyzedByDay:be,rules:Xe,commands:et,errors:at},entries:Ny(ye).sort((ct,lt)=>new Date(lt.ts).getTime()-new Date(ct.ts).getTime())}}import{spawn as My}from"node:child_process";import{existsSync as Hy,statSync as Sd}from"node:fs";import{delimiter as Uy,join as Gy}from"node:path";var By=120000,Kr="Choose the project folder",qy=`try
  return POSIX path of (choose folder with prompt "${Kr}")
on error number -128
  return ""
end try`,Vy=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${Kr}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Rd=[{binary:"zenity",args:["--file-selection","--directory",`--title=${Kr}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",Kr]}],Pd=(A,z)=>(z.PATH??"").split(Uy).some((X)=>{if(X.length===0)return!1;try{let ee=Sd(Gy(X,A));return ee.isFile()&&(ee.mode&73)!==0}catch{return!1}});function Si(A,z){if(A==="darwin"||A==="win32")return!0;if(A!=="linux")return!1;if(!z.DISPLAY&&!z.WAYLAND_DISPLAY)return!1;return Rd.some((X)=>Pd(X.binary,z))}function zy(A,z){if(A==="darwin")return{cmd:"osascript",args:["-e",qy]};if(A==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",Vy]};let X=Rd.find((ee)=>Pd(ee.binary,z));return X?{cmd:X.binary,args:X.args}:null}function Ri(A=process.platform,z=process.env){let X=zy(A,z);if(!X)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((ee)=>{let te=My(X.cmd,X.args,{env:z,stdio:["ignore","pipe","pipe"]}),ae="",le=!1,ye=(ve)=>{if(le)return;le=!0,clearTimeout(he),ee(ve)},he=setTimeout(()=>{te.kill(),ye({error:"The folder dialog timed out"})},By);te.stdout.on("data",(ve)=>{ae+=ve.toString()}),te.on("error",()=>ye({error:`Could not open the folder dialog (${X.cmd})`})),te.on("close",()=>{let ve=ae.trim().replace(/\/+$/,"");if(!ve)return ye({cancelled:!0});if(!Hy(ve)||!Sd(ve).isDirectory())return ye({error:"That selection is not a folder on disk"});ye({path:ve})})})}var Ed=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CC Safety Net</title>
  <link rel="icon" href="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221254%22%20height%3D%221254%22%20viewBox%3D%2254%2023%201140%201140%22%20role%3D%22img%22%20aria-label%3D%22Safety%20net%20logo%20mesh%20variant%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-0%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.68%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-1%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.58%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-2%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-3%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.38%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22edge%22%20x1%3D%2214%25%22%20y1%3D%228%25%22%20x2%3D%2288%25%22%20y2%3D%2294%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23bae6fd%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%231e293b%22%20stop-opacity%3D%220.86%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cmask%20id%3D%22net-mask%22%20maskUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fmask%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Cg%20mask%3D%22url(%23net-mask)%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22%2307090d%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22360%22%20cy%3D%22240%22%20r%3D%22430%22%20fill%3D%22url(%23spot-0)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22820%22%20cy%3D%22300%22%20r%3D%22430%22%20fill%3D%22url(%23spot-1)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22760%22%20cy%3D%22830%22%20r%3D%22500%22%20fill%3D%22url(%23spot-2)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22780%22%20r%3D%22390%22%20fill%3D%22url(%23spot-3)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22url(%23edge)%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22url(%23edge)%22%20stroke-width%3D%2214%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.2%22%20stroke-width%3D%225%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate(-10%20-14)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
  <script>
    (() => {
      const stored = localStorage.getItem('cc-safety-net-theme');
      if (stored === 'light' || stored === 'dark') document.documentElement.style.colorScheme = stored;
    })();
  </script>
  <style>
:root {
  color-scheme: light dark;

  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --bg: light-dark(#f3f4f6, #0c0e11);
  --surface: light-dark(#ffffff, #16191d);
  --surface-2: light-dark(#f6f7f9, #1c2025);
  --btn-hover-fill: light-dark(#e9ebef, #282c33);
  --field-bg: light-dark(#ffffff, #101317);

  --ink: light-dark(#171a1f, #e7eaed);
  --muted: light-dark(#5b626c, #99a1ac);
  --meta: light-dark(#6b7280, #838b95);

  --border: light-dark(#e3e6ea, #292d33);
  --border-strong: light-dark(#cfd4da, #363b42);

  --switch-track: light-dark(#8b929c, #626973);
  --switch-track-hover: #767d87;
  --switch-knob: #ffffff;

  --focus-ring: var(--ink);

  --accent: light-dark(#166534, #3fb950);
  --safe: #14532d;
  --safe-hover: #0f3d20;
  --danger: #7f1d1d;
  --danger-hover: #641414;

  --star: light-dark(#b7791f, #f2c94c);

  --ok-fg: light-dark(#15803d, #4ade80);
  --ok-bg: light-dark(#edfaf1, #10251a);
  --ok-border: light-dark(#b7e4c7, #1f5133);

  --err-fg: light-dark(#b42318, #ff8078);
  --err-bg: light-dark(#fef2f1, #2b1512);
  --err-border: light-dark(#f2c9c4, #5c2620);

  --warn-fg: light-dark(#b45309, #fbbf24);
  --warn-bg: light-dark(#fefaf0, #2a2008);
  --warn-border: light-dark(#f2ddb0, #5c4a1d);

  --master: light-dark(#1d4ed8, #4c8dff);
  --master-fg: light-dark(#1e40af, #9ec3ff);
  --master-bg: light-dark(#eef4fe, #101a2b);
  --master-border: light-dark(#c5d6f6, #23446e);

  --strict-fg: light-dark(#1e40af, #9ec3ff);
  --strict-bg: light-dark(#eef4fe, #101a2b);
  --strict-border: light-dark(#c5d6f6, #23446e);
  --paranoid-fg: light-dark(#6b21a8, #d8b4fe);
  --paranoid-bg: light-dark(#faf5ff, #21152c);
  --paranoid-border: light-dark(#e4ccf4, #513064);

  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;

  --topbar-h: 58px;

  font-family: var(--font-sans);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 14px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.brand {
  padding: 0 10px;
}

h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-logo {
  display: flex;
  color: var(--ink);
}

.brand-home {
  display: flex;
  color: inherit;
}

.brand-logo svg {
  width: auto;
  height: 30px;
}

.sidenav {
  display: grid;
  gap: 2px;
}

.sidenav a {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.sidenav a:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.sidenav a[aria-current="page"] {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.sidenav svg {
  width: 15px;
  height: 15px;
  flex: none;
}

.sidebar-foot {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding: 0 10px;
}

.sidebar-links {
  display: grid;
  gap: 5px;
  font-size: 12px;
}

.sidebar-links a {
  color: var(--meta);
  text-decoration: none;
}

.sidebar-links a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sidebar-links a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

.content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.app-foot {
  display: none;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  min-height: var(--topbar-h);
  padding: 12px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.topbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  max-width: 1040px;
  margin: 0 auto;
}

.topbar-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.app-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.25;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.app-status:empty {
  display: none;
}

.app-status.ok {
  color: var(--ok-fg);
  border-color: var(--ok-border);
  background: var(--ok-bg);
}

.app-status.error {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.dirty-chip {
  padding: 6px 12px;
  border: 1px solid var(--warn-border);
  border-radius: 999px;
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.view-search {
  display: flex;
  align-items: center;
  flex: 1 1 240px;
  min-width: 180px;
  max-width: 380px;
}

.topbar-search {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 440px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

button:not(:disabled),
select,
label.row:not(.row-disabled),
label.rule-control,
input[type="checkbox"]:not(:disabled),
input[type="radio"]:not(:disabled) {
  cursor: pointer;
}

button {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 14px;
  background: var(--surface);
  color: var(--ink);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

button:hover:not(:disabled) {
  background: var(--surface-2);
  border-color: var(--muted);
}

#theme-toggle,
#raw-copy,
#activity-refresh,
#integrations-refresh,
#rules-refresh,
#tester-run,
#reset-rule-customizations,
#reset-secret-customizations,
.rule-example-button {
  border-color: transparent;
}

#theme-toggle:hover:not(:disabled),
#raw-copy:hover:not(:disabled),
#activity-refresh:hover:not(:disabled),
#integrations-refresh:hover:not(:disabled),
#rules-refresh:hover:not(:disabled),
#tester-run:hover:not(:disabled),
#reset-rule-customizations:hover:not(:disabled),
#reset-secret-customizations:hover:not(:disabled),
.rule-example-button:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

button:disabled {
  opacity: 0.6;
  cursor: progress;
}

button.primary {
  background: var(--safe);
  border-color: var(--safe);
  color: #fff;
}

button.primary:hover:not(:disabled) {
  background: var(--safe-hover);
  border-color: var(--safe-hover);
}

button.danger {
  background: var(--danger);
  border-color: var(--danger);
  color: #fff;
}

button.danger:hover:not(:disabled) {
  background: var(--danger-hover);
  border-color: var(--danger-hover);
}

#theme-toggle {
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 7px;
  color: var(--muted);
}

#theme-toggle:hover {
  color: var(--ink);
}

#theme-toggle svg {
  width: 15px;
  height: 15px;
}

button.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--muted);
}

button.icon-button:hover:not(:disabled) {
  color: var(--ink);
}

button.icon-button.copied {
  color: var(--ok-fg);
}

button.icon-button.copied:hover:not(:disabled) {
  color: var(--ok-fg);
}

button.icon-button svg {
  width: 16px;
  height: 16px;
}

:where(button, input, textarea):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

main {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 28px 48px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.view {
  display: grid;
  gap: 18px;
}

.view[hidden] {
  display: none;
}

.view-head .panel-sub {
  margin-top: 0;
}

.policy-savebar {
  position: sticky;
  top: var(--topbar-h);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.savebar-actions {
  display: flex;
  gap: 8px;
}

.retention-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12.5px;
  font-weight: 600;
}

.retention-row input {
  width: 84px;
  text-align: right;
}

.retention-note {
  margin: 8px 0 0;
  font-size: 12px;
}

.tiles-window {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
}

.tiles-window:empty {
  display: none;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.tiles:empty {
  display: none;
}

.tile {
  display: grid;
  grid-template-columns: 1fr minmax(0, 168px);
  grid-template-areas:
    "value spark"
    "label spark";
  align-items: center;
  gap: 3px 16px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.tile strong {
  grid-area: value;
  align-self: end;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.tile span {
  grid-area: label;
  align-self: start;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
}

.view-all-link {
  align-self: center;
  padding: 8px 14px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.view-all-link:hover {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.protection-warning {
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

.dual-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

@media (max-width: 720px) {
  .dual-panels {
    grid-template-columns: 1fr;
  }
}

#top-rules,
#top-commands {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
}

.top-rule,
.top-command {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 7px 10px;
  border-color: transparent;
  background: transparent;
  border-radius: var(--radius-sm);
  text-align: left;
}

.top-rule:hover:not(:disabled),
.top-command:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

.top-rule .rule-id,
.top-command .rule-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.guard-errors {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--warn-border);
  border-radius: var(--radius);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12.5px;
  font-weight: 600;
  text-align: left;
}

.activity-controls {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.activity-controls-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.activity-days {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 650;
  color: var(--muted);
}

.activity-refresh {
  margin-left: auto;
}

@keyframes activity-refresh-spin {
  to {
    transform: rotate(360deg);
  }
}

.activity-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

.integrations-refresh,
.rules-refresh {
  margin-left: auto;
}

.integrations-refresh.spinning svg,
.rules-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

#integrations-list {
  display: grid;
  gap: 8px;
}

.integration-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.integration-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.integration-row .status {
  grid-column: 1 / -1;
}

.integration-row button.primary,
.integration-row button.danger {
  min-width: 88px;
  background: transparent;
  border-color: transparent;
  color: var(--ink);
}

.integration-row button.primary:hover:not(:disabled),
.integration-row button.danger:hover:not(:disabled) {
  color: #fff;
}

#rules-composer-panel .field + .field,
.rules-composer-actions {
  margin-top: 14px;
}

.rules-path-row {
  display: flex;
  gap: 8px;
}

.rules-path-row input {
  flex: 1 1 auto;
  min-width: 0;
}

.rules-path-row button {
  flex: none;
}

#rules-project-path[readonly] {
  border-color: var(--border);
  color: var(--muted);
}

.rules-composer-actions {
  display: flex;
  justify-content: flex-end;
}

#rules-list,
#rules-diagnostics {
  display: grid;
  gap: 8px;
}

.rulebook-card {
  display: grid;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.rulebook-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.rulebook-head code,
.rulebook-rule code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.rulebook-rule .rule-id {
  color: var(--muted);
}

.rulebook-rule p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule.rules-focus {
  margin: 0 -8px;
  padding: 10px 8px;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
}

select {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 10px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
}

.chip-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.chip-row:empty {
  display: none;
}

button.chip {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

button.chip[aria-pressed="true"] {
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

.chip-count {
  font-variant-numeric: tabular-nums;
}

button.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

button.filter-pill code {
  font-family: var(--font-mono);
}

.filter-pill-x {
  opacity: 0.7;
}

.feed-list {
  display: grid;
  gap: 8px;
}

.feed-item {
  display: grid;
  gap: 7px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.feed-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--meta);
}

.feed-meta time {
  margin-left: auto;
  white-space: nowrap;
}

.feed-copy,
.feed-report {
  width: 26px;
  height: 26px;
  margin: -4px 0;
  border: 0;
  background: transparent;
}

.feed-copy:hover:not(:disabled),
.feed-report:hover:not(:disabled) {
  background: transparent;
}

.feed-copy svg,
.feed-report svg {
  width: 14px;
  height: 14px;
}

.feed-copy.copied svg {
  width: 12px;
  height: 12px;
}

.feed-meta .rule-id {
  font-family: var(--font-mono);
  color: var(--muted);
  overflow-wrap: anywhere;
}

#tester-result .rule-id {
  font-family: var(--font-mono);
}

button.rule-id {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
}

button.rule-id:hover {
  color: var(--ink);
  text-decoration: underline;
}

.decision-badge {
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.decision-badge.deny {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.decision-badge.allow {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.decision-badge.error {
  color: var(--warn-fg);
  background: var(--warn-bg);
  border-color: var(--warn-border);
}

.agent-badge {
  padding: 1px 8px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  color: var(--muted);
  font-weight: 600;
}

.feed-command,
.rule-example-popover code {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 12px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.feed-command {
  padding: 8px 10px;
  max-width: 85ch;
  max-height: 7.2em;
  overflow: hidden;
}

.feed-command.clamped {
  mask-image: linear-gradient(180deg, #000 calc(100% - 1.6em), transparent);
}

.feed-command.expanded {
  max-height: none;
  mask-image: none;
}

.feed-toggle {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.feed-block {
  align-self: center;
  font-size: 11px;
}

.feed-day-sep {
  padding-top: 6px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.tile-spark {
  grid-area: spark;
  display: flex;
  align-items: stretch;
  gap: 2px;
  width: 100%;
  height: 40px;
}

.spark-col {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex: 1 1 0;
  min-width: 1px;
}

.spark-bar {
  width: 100%;
  background: var(--accent);
  border-radius: 1px;
}

.spark-bar.spark-zero {
  background: var(--border-strong);
}

.spark-col::after {
  content: attr(data-count);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease;
}

.spark-col:hover::after,
.spark-col:focus-visible::after {
  opacity: 1;
}

.spark-col:focus-visible {
  border-radius: var(--radius-sm);
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.feed-reason {
  margin: 0;
  max-width: 85ch;
  font-size: 12px;
}

.activity-count {
  margin: 12px 0 0;
  font-size: 12px;
}

.activity-count:empty {
  display: none;
}

.info-rows {
  display: grid;
  gap: 10px;
}

.info-row {
  display: grid;
  gap: 3px;
}

.info-row > span {
  font-size: 12px;
  font-weight: 650;
  color: var(--muted);
}

.info-row code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.danger-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.danger-row strong {
  font-size: 13px;
}

.danger-row p {
  margin: 4px 0 0;
  font-size: 12px;
}

.status {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-size: 13px;
  line-height: 1.45;
  white-space: pre-wrap;
}

.status:empty {
  display: none;
}

.protection-banner {
  padding: 10px 14px;
  border: 1px solid var(--err-fg);
  border-radius: var(--radius);
  background: var(--err-bg);
  color: var(--err-fg);
  font-weight: 600;
}

.status.ok {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.status.error {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.health-strip strong {
  color: var(--ink);
  font-weight: 650;
}

.recovery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border: 1px solid var(--err-border);
  border-radius: var(--radius);
  background: var(--surface);
}

.recovery[hidden] {
  display: none;
}

.recovery strong {
  display: block;
  font-size: 13px;
}

.recovery p {
  margin: 4px 0 0;
}

.muted {
  color: var(--muted);
  line-height: 1.45;
}

.confirm-dialog {
  width: min(420px, calc(100vw - 32px));
  padding: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--ink);
}

.rule-example-popover {
  position: fixed;
  inset: auto;
  width: min(360px, calc(100vw - 24px));
  margin: 0;
  padding: 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 4px 8px rgb(0 0 0 / 18%);
}

.rule-example-popover::backdrop {
  background: transparent;
}

.rule-example-popover > * {
  display: block;
}

.rule-example-label {
  margin-bottom: 3px;
  color: var(--muted);
  font-size: 11px;
}

.rule-example-popover strong {
  margin-bottom: 10px;
  font-size: 13px;
}

.rule-example-popover code {
  padding: 9px 10px;
}

.confirm-dialog::backdrop {
  background: rgb(0 0 0 / 48%);
}

.confirm-dialog form {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.confirm-dialog h2 {
  margin: 0;
}

.confirm-dialog p {
  margin: 0;
}

.dialog-detail {
  padding: 9px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  overflow-wrap: anywhere;
}

.dialog-detail code {
  font-family: var(--font-mono);
  font-size: 12px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}

.report-dialog {
  width: min(680px, calc(100vw - 32px));
}

.confirm-dialog:has(.dialog-rows:not([hidden])) {
  width: min(620px, calc(100vw - 32px));
}

.dialog-rows {
  max-height: 46vh;
  overflow: auto;
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
}

.diff-table th {
  padding: 4px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-weight: 600;
}

.diff-table td {
  padding: 5px 8px;
  border-bottom: 1px solid var(--border);
  overflow-wrap: anywhere;
  vertical-align: top;
}

.diff-table code {
  font-family: var(--font-mono);
  font-size: 11.5px;
}

.diff-before {
  color: var(--muted);
  text-decoration: line-through;
}

.diff-after {
  color: var(--ink);
  font-weight: 650;
}

.diff-warning {
  margin: 8px 0 0;
  padding: 7px 10px;
  border-left: 3px solid var(--warn-border);
  border-radius: var(--radius-sm);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
}

.view-head-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.project-draft-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid var(--master-border);
  border-radius: var(--radius);
  background: var(--master-bg);
}

.project-draft-bar[hidden] {
  display: none;
}

.project-draft-target strong {
  display: block;
  font-size: 13px;
}

.project-draft-target code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.project-draft-target p {
  margin: 4px 0 0;
  font-size: 12px;
}

.project-chip {
  flex: none;
  align-self: center;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--master-border);
  border-radius: 999px;
  background: var(--master-bg);
  color: var(--master-fg);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.project-chip.inherited {
  border-color: var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 600;
}

.rule-row > .project-chip {
  grid-column: 1 / -1;
  justify-self: end;
  margin-left: 0;
}

.project-field-line {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.project-chip-slot:empty {
  display: none;
}

.row:has(.project-chip.inherited) strong {
  color: var(--muted);
}

.report-field {
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.panel-title {
  min-width: 0;
}

.raw-json-head {
  flex-wrap: nowrap;
}

.raw-json-head .panel-title {
  flex: 1 1 auto;
}

.raw-json-head #raw-copy {
  flex: none;
}

.panel-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: -4px 0;
  padding: 4px 6px 4px 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.panel-toggle:hover {
  background: transparent;
  color: var(--ink);
}

.panel-chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  transition: transform 0.15s ease;
}

.panel-toggle[aria-expanded="false"] .panel-chevron,
:is(.rule-tier-head, .tier-collapse)[aria-expanded="false"] .panel-chevron {
  transform: rotate(-45deg);
}

h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.panel-sub {
  margin: 4px 0 0;
  font-size: 12.5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 8px;
}

label.row {
  display: flex;
  gap: 12px;
}

label.row,
.rule-row {
  align-items: flex-start;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

label.row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

label.row.row-disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

label.row.row-disabled:hover {
  border-color: var(--border);
  background: var(--surface);
}

:is(label.row, .rule-control) input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  margin: 1px 0 0;
  width: 34px;
  height: 20px;
  flex: none;
  border: 1px solid var(--switch-track);
  border-radius: 999px;
  background: var(--switch-track);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

:is(label.row, .rule-control) input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

:is(label.row, .rule-control) input[type="checkbox"]:checked {
  background: var(--accent);
  border-color: var(--accent);
}

:is(label.row, .rule-control) input[type="checkbox"]:checked::before {
  transform: translateX(14px);
}

:is(label.row, .rule-control):hover input[type="checkbox"]:not(:checked) {
  border-color: var(--switch-track-hover);
  background: var(--switch-track-hover);
}

label.row.safety-override-row {
  display: grid;
  gap: 8px;
}

label.row.safety-override-row select {
  width: 100%;
}

:is(label.row, .rule-control) span {
  display: block;
  min-width: 0;
}

:is(label.row, .rule-control) strong {
  font-weight: 650;
  font-size: 13px;
}

:is(label.row, .rule-control) .rule-id {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
  word-break: break-all;
}

:is(label.row, .rule-control) small {
  display: block;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
}

#destructive-command > label.row {
  margin-bottom: 16px;
}

.preset-status {
  margin-bottom: 10px;
  font-weight: 700;
}

#safety-preset-status:empty {
  display: none;
}

.preset-status.customized {
  color: var(--master-fg);
}

.preset-standard {
  --preset-fg: var(--ok-fg);
  --preset-bg: var(--ok-bg);
  --preset-border: var(--ok-border);
}

.preset-strict {
  --preset-fg: var(--strict-fg);
  --preset-bg: var(--strict-bg);
  --preset-border: var(--strict-border);
}

.preset-paranoid {
  --preset-fg: var(--paranoid-fg);
  --preset-bg: var(--paranoid-bg);
  --preset-border: var(--paranoid-border);
}

#safety-level label.row:has(input:checked),
#safety-level label.row:has(input:checked):hover {
  border-color: var(--preset-border);
  background: var(--preset-bg);
  accent-color: var(--preset-fg);
}

#safety-level label.row:has(input:checked) strong {
  color: var(--preset-fg);
}

.panel-head-action {
  flex: none;
}

.rule-tier {
  overflow: clip;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
}

.rule-tier + .rule-tier,
#destructive-command-rules + .rule-tier {
  margin-top: 10px;
}

.rule-tier-enforced {
  border-color: var(--ok-border);
}

.rule-tier-strict {
  border-color: var(--strict-border);
}

.rule-tier-paranoid {
  border-color: var(--paranoid-border);
}

.rule-tier-head {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: var(--surface-2);
  color: var(--ink);
  text-align: left;
}

.rule-tier-head:hover:not(:disabled) {
  background: var(--surface-2);
}

.tier-collapse {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 12px;
  margin: -9px -10px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  text-align: left;
}

.tier-switch {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 30px;
  height: 16px;
  flex: none;
  padding: 0;
  border: 0;
  background: none;
}

.tier-switch::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: var(--switch-track);
  transition: background-color 0.18s ease;
}

.tier-switch::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

.tier-switch:checked::after {
  background: color-mix(in srgb, var(--accent) 45%, transparent);
}

.tier-switch:checked::before {
  transform: translateX(14px);
  background: var(--accent);
}

.rule-tier-enforced .rule-tier-head,
.rule-tier-enforced .rule-tier-head:hover:not(:disabled) {
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.rule-tier-strict .rule-tier-head,
.rule-tier-strict .rule-tier-head:hover:not(:disabled) {
  background: var(--strict-bg);
  color: var(--strict-fg);
}

.rule-tier-paranoid .rule-tier-head,
.rule-tier-paranoid .rule-tier-head:hover:not(:disabled) {
  background: var(--paranoid-bg);
  color: var(--paranoid-fg);
}

.tier-label {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 1px;
}

.tier-label small,
.tier-counts {
  color: inherit;
  font-size: 11px;
}

.tier-counts {
  flex: none;
  font-weight: 500;
  text-align: right;
}

.tier-counts .count-off {
  color: var(--warn-fg);
}

.tier-content {
  padding: 12px;
  border-top: 1px solid var(--border);
}

.rule-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.rule-row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

.rule-row.row-disabled {
  background: var(--surface);
}

.rule-control {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: flex-start;
  gap: 12px;
}

.rule-row.row-disabled .rule-control {
  cursor: not-allowed;
  opacity: 0.62;
}

.rule-example-button {
  position: relative;
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  line-height: 1;
}

.rule-example-button::before {
  content: "";
  position: absolute;
  inset: -9px;
}

.rule-example-button:hover:not(:disabled) {
  color: var(--ink);
}

.inherit-button {
  grid-column: 1 / -1;
  justify-self: end;
  padding: 5px 8px;
  font-size: 11px;
}

label.row.master {
  align-items: center;
  padding: 12px 14px;
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

label.row.master:hover {
  border-color: color-mix(in srgb, var(--err-fg) 34%, var(--err-border));
  background: var(--err-bg);
}

label.row.master:not(:has(input:checked)) {
  border-left: 3px solid var(--err-fg);
}

label.row.master:has(input:checked) {
  border-color: var(--master-border);
  background: color-mix(in srgb, var(--master-bg) 72%, var(--surface));
}

label.row.master:has(input:checked):hover {
  border-color: color-mix(in srgb, var(--master) 42%, var(--master-border));
  background: var(--master-bg);
}

label.row.master strong {
  font-size: 15px;
}

label.row.master input[type="checkbox"] {
  margin: 0;
  width: 44px;
  height: 24px;
}

label.row.master input[type="checkbox"]:checked {
  background: var(--master);
  border-color: var(--master);
}

label.row.master input[type="checkbox"]::before {
  width: 18px;
  height: 18px;
}

label.row.master input[type="checkbox"]:checked::before {
  transform: translateX(20px);
}

.master-badge {
  flex: none;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--err-border);
  border-radius: 999px;
  background: var(--err-bg);
  color: var(--err-fg);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

label.row.master:has(input:checked) .master-badge {
  border-color: var(--master-border);
  background: var(--master-bg);
  color: var(--master-fg);
}

.state-active {
  color: var(--ok-fg);
  font-weight: 700;
}

.state-disabled {
  color: var(--err-fg);
  font-weight: 700;
}

.destructive-command-group + .destructive-command-group {
  margin-top: 24px;
}

.destructive-command-group h3 {
  margin: 0 0 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

.empty {
  margin: 0;
  padding: 16px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  color: var(--muted);
  text-align: center;
}

#secret {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 4px;
}

.field-toggle .panel-toggle {
  justify-self: start;
  margin: -2px 0;
  padding: 2px 6px 2px 0;
  font-weight: 650;
}

#safety-level + .field,
.foldable-field-content + .field {
  margin-top: 14px;
}

#safety-overrides,
#workflow {
  margin-top: 4px;
}

.foldable-field-content {
  display: grid;
  gap: 4px;
}

.foldable-field-content > p {
  margin: 0;
  font-size: 12px;
}

.paths-content:not([hidden]) {
  display: grid;
  gap: 10px;
}

.paths-content > p.muted {
  margin: 0;
  font-size: 12px;
}

.field > span {
  font-size: 13px;
  font-weight: 650;
}

.field small {
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 400;
  line-height: 1.45;
}

input[type="search"],
input[type="text"],
textarea {
  width: 100%;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 9px 11px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
  transition: border-color 0.15s ease;
}

input[type="search"]:hover,
input[type="text"]:hover,
textarea:hover {
  border-color: var(--muted);
}

input[type="search"]:focus,
input[type="text"]:focus,
textarea:focus {
  border-color: var(--muted);
  outline: none;
}

input[type="text"]:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.tester-row {
  display: flex;
  gap: 8px;
}

.tester-row input[type="text"] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.tester-row button {
  flex: none;
  align-self: center;
}

#tester-result {
  margin-top: 12px;
}

.tester-segment {
  margin-top: 6px;
}

.paths-add {
  display: flex;
  gap: 8px;
}

.paths-add input[type="text"] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.paths-add button {
  flex: none;
  align-self: center;
}

.paths-hint {
  margin: -6px 0 0;
  color: var(--err-fg);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.paths-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.path-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.path-item code {
  flex: 1 1 auto;
  min-width: 0;
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 12.5px;
  overflow-wrap: anywhere;
}

.path-item button:hover:not(:disabled) {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.path-item.row-disabled {
  opacity: 0.62;
}

.path-item.row-disabled button {
  cursor: not-allowed;
}

.path-item button {
  flex: none;
}

textarea {
  min-height: 96px;
  resize: vertical;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.55;
}

#raw {
  min-height: 280px;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.star-pitch {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  color: var(--ink);
  font-size: 12.5px;
  line-height: 1.45;
}

.star-pitch strong {
  font-variant-numeric: tabular-nums;
}

.star-mechanism {
  display: block;
  margin-top: 2px;
  color: var(--meta);
  font-size: 11.5px;
}

#star-slot {
  display: inline-flex;
  flex: none;
}

.star-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: none;
  white-space: nowrap;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--muted);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.star-cta:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--star) 45%, var(--border-strong));
  background: var(--surface-2);
  color: var(--ink);
}

.star-cta:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.star-icon {
  display: inline-flex;
  width: 15px;
  height: 15px;
  color: var(--star);
}

.star-icon svg {
  width: 15px;
  height: 15px;
}

.star-count {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  border-left: 1px solid var(--border-strong);
  padding-left: 8px;
  color: var(--muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.star-cta.starred:disabled {
  opacity: 1;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* biome-ignore lint/complexity/noImportantStyles: reduced-motion must win over every class-level transition */
    transition: none !important;
  }

  .activity-refresh.spinning svg,
  .integrations-refresh.spinning svg,
  .rules-refresh.spinning svg {
    animation: none;
  }
}

@media (max-width: 900px) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    z-index: 100;
    height: var(--topbar-h);
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 0 16px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .brand-logo svg {
    height: 20px;
  }

  .topbar {
    position: static;
    z-index: auto;
  }

  .topbar.has-search {
    position: sticky;
    top: var(--topbar-h);
    z-index: 95;
  }

  .policy-savebar {
    top: calc(var(--topbar-h) * 2);
  }

  .brand {
    flex: none;
    padding: 0;
  }

  main {
    flex: 1;
  }

  .app-foot {
    display: flex;
    justify-content: center;
    gap: 28px;
    padding: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
  }

  .app-foot a {
    color: var(--meta);
    text-decoration: none;
  }

  .app-foot a:hover {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .sidenav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 2px;
  }

  .sidenav a {
    padding: 15px 7px;
  }

  .sr-only-collapse {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .sidebar-foot {
    display: none;
  }
}

@media (max-width: 640px) {
  .topbar {
    padding: 10px 16px;
  }

  .topbar-row {
    flex-wrap: wrap;
  }

  .topbar.has-search .topbar-row {
    flex-wrap: nowrap;
  }

  main {
    padding: 18px 16px 40px;
  }

  .topbar-search {
    max-width: none;
  }

  .panel {
    padding: 16px;
  }

  .star-row {
    flex-wrap: wrap;
  }

  .star-row .star-cta,
  .star-row #star-slot {
    flex: 1 1 100%;
    justify-content: center;
  }

  .panel-head {
    flex-direction: column;
  }

  .raw-json-head,
  .panel-head:has(.view-all-link) {
    flex-direction: row;
    align-items: center;
  }

  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .rule-tier-head,
  .tier-collapse {
    flex-wrap: wrap;
  }

  .rule-row {
    align-items: start;
  }

  .tier-counts {
    flex: 1 1 100%;
    padding-left: 20px;
    text-align: left;
  }

  .inherit-button {
    align-self: flex-start;
  }
}

@media (min-width: 1440px) {
  body[data-view="overview"] main,
  body[data-view="overview"] .topbar-row {
    max-width: 1200px;
  }
}

[hidden] {
  display: none;
}

  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <h1 class="brand-logo"><a class="brand-home" href="#overview" title="Overview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 512" role="img" aria-label="CC Safety Net">
  <path d="M 1439 165 L 1411 165 L 1409 166 L 1408 168 L 1403 173 L 1403 174 L 1398 179 L 1398 180 L 1395 183 L 1394 183 L 1394 184 L 1385 194 L 1385 195 L 1381 199 L 1381 200 L 1378 202 L 1378 203 L 1374 207 L 1374 208 L 1367 215 L 1367 216 L 1358 226 L 1358 227 L 1352 233 L 1352 234 L 1347 239 L 1347 240 L 1341 246 L 1341 247 L 1336 252 L 1336 253 L 1332 257 L 1332 258 L 1325 265 L 1325 266 L 1319 272 L 1319 273 L 1314 278 L 1314 279 L 1309 284 L 1309 285 L 1303 291 L 1303 292 L 1299 296 L 1299 297 L 1294 302 L 1291 299 L 1290 300 L 1290 301 L 1293 301 L 1294 302 L 1288 309 L 1287 308 L 1288 309 L 1286 312 L 1285 311 L 1285 306 L 1286 305 L 1286 303 L 1288 299 L 1288 296 L 1289 295 L 1289 292 L 1290 291 L 1290 287 L 1291 286 L 1291 284 L 1293 280 L 1293 277 L 1294 276 L 1294 272 L 1295 271 L 1295 269 L 1297 265 L 1297 262 L 1298 261 L 1298 258 L 1299 257 L 1299 253 L 1300 252 L 1300 250 L 1301 249 L 1301 247 L 1303 243 L 1303 238 L 1304 237 L 1304 235 L 1305 234 L 1305 232 L 1307 228 L 1307 224 L 1308 223 L 1308 221 L 1309 220 L 1309 217 L 1310 216 L 1310 214 L 1312 210 L 1312 205 L 1314 202 L 1314 199 L 1316 195 L 1317 188 L 1318 187 L 1318 185 L 1319 184 L 1319 182 L 1321 178 L 1321 173 L 1323 169 L 1323 166 L 1296 166 L 1296 168 L 1294 171 L 1294 174 L 1293 175 L 1293 178 L 1292 179 L 1291 186 L 1290 187 L 1290 189 L 1289 190 L 1289 192 L 1287 196 L 1287 200 L 1285 204 L 1285 207 L 1283 211 L 1283 215 L 1282 216 L 1282 218 L 1281 219 L 1281 222 L 1279 226 L 1279 229 L 1278 230 L 1278 234 L 1277 235 L 1277 237 L 1276 238 L 1276 240 L 1274 244 L 1274 249 L 1273 250 L 1273 252 L 1271 256 L 1271 259 L 1270 260 L 1270 263 L 1269 264 L 1269 268 L 1268 269 L 1268 271 L 1266 275 L 1266 278 L 1265 279 L 1265 284 L 1264 285 L 1264 287 L 1262 291 L 1262 294 L 1261 295 L 1261 298 L 1260 299 L 1259 306 L 1258 307 L 1258 309 L 1257 310 L 1257 313 L 1256 314 L 1256 318 L 1254 322 L 1254 325 L 1273 325 L 1274 327 L 1273 328 L 1272 327 L 1273 328 L 1269 332 L 1269 333 L 1265 337 L 1265 338 L 1261 341 L 1261 342 L 1252 352 L 1252 353 L 1247 358 L 1247 359 L 1242 364 L 1242 365 L 1239 367 L 1239 368 L 1224 385 L 1224 386 L 1220 390 L 1220 391 L 1216 395 L 1216 396 L 1214 397 L 1214 399 L 1247 399 L 1249 397 L 1249 396 L 1259 385 L 1259 384 L 1263 380 L 1263 379 L 1265 377 L 1266 377 L 1266 376 L 1271 371 L 1271 370 L 1278 363 L 1278 362 L 1283 357 L 1283 356 L 1294 344 L 1294 343 L 1298 339 L 1298 338 L 1305 331 L 1305 330 L 1309 326 L 1309 325 L 1312 323 L 1313 320 L 1315 319 L 1316 317 L 1321 312 L 1322 312 L 1321 311 L 1330 301 L 1330 300 L 1335 295 L 1335 294 L 1337 292 L 1338 292 L 1339 289 L 1342 287 L 1342 286 L 1346 282 L 1346 281 L 1352 275 L 1352 274 L 1361 264 L 1361 263 L 1370 253 L 1370 252 L 1375 247 L 1375 246 L 1380 241 L 1380 240 L 1387 233 L 1387 232 L 1402 215 L 1402 214 L 1406 210 L 1406 209 L 1408 207 L 1409 207 L 1409 206 L 1413 202 L 1413 201 L 1418 196 L 1418 195 L 1422 191 L 1422 190 L 1427 185 L 1427 184 L 1431 180 L 1431 179 L 1440 169 L 1441 167 Z
M 1129 179 L 1126 178 L 1125 176 L 1124 176 L 1116 170 L 1114 170 L 1107 166 L 1105 166 L 1104 165 L 1101 165 L 1100 164 L 1096 164 L 1095 163 L 1091 163 L 1090 162 L 1081 162 L 1080 161 L 1076 161 L 1075 162 L 1066 162 L 1065 163 L 1061 163 L 1060 164 L 1057 164 L 1056 165 L 1051 165 L 1050 166 L 1045 167 L 1040 170 L 1038 170 L 1028 175 L 1023 179 L 1021 179 L 1017 183 L 1016 183 L 1012 187 L 1011 187 L 999 199 L 999 200 L 996 203 L 996 204 L 994 205 L 993 208 L 990 211 L 981 229 L 981 231 L 980 232 L 980 234 L 979 235 L 979 237 L 977 241 L 977 244 L 976 245 L 976 254 L 975 255 L 975 265 L 976 266 L 976 273 L 977 274 L 977 277 L 980 283 L 981 288 L 984 292 L 985 295 L 988 298 L 989 301 L 998 310 L 1001 311 L 1004 314 L 1007 315 L 1009 317 L 1013 319 L 1015 319 L 1018 321 L 1020 321 L 1024 323 L 1027 323 L 1028 324 L 1035 324 L 1036 325 L 1054 325 L 1055 324 L 1062 324 L 1063 323 L 1067 323 L 1068 322 L 1071 322 L 1077 319 L 1080 319 L 1087 315 L 1089 315 L 1093 313 L 1095 311 L 1098 310 L 1103 306 L 1106 305 L 1116 296 L 1117 296 L 1115 292 L 1113 290 L 1112 290 L 1111 288 L 1109 286 L 1108 286 L 1107 284 L 1100 278 L 1098 279 L 1090 286 L 1089 286 L 1086 289 L 1074 295 L 1072 295 L 1068 297 L 1065 297 L 1064 298 L 1061 298 L 1060 299 L 1041 299 L 1040 298 L 1037 298 L 1036 297 L 1031 296 L 1028 294 L 1026 294 L 1024 292 L 1020 290 L 1010 280 L 1008 275 L 1006 273 L 1005 271 L 1005 268 L 1004 267 L 1004 264 L 1003 263 L 1003 248 L 1004 247 L 1005 238 L 1008 233 L 1008 231 L 1010 227 L 1012 225 L 1013 222 L 1018 216 L 1018 215 L 1030 203 L 1031 203 L 1044 194 L 1046 194 L 1053 190 L 1056 190 L 1057 189 L 1060 189 L 1061 188 L 1064 188 L 1065 187 L 1071 187 L 1072 186 L 1076 186 L 1077 187 L 1083 187 L 1084 188 L 1087 188 L 1088 189 L 1090 189 L 1091 190 L 1096 191 L 1100 194 L 1103 195 L 1106 198 L 1107 198 L 1109 200 L 1109 201 L 1114 206 L 1114 207 L 1116 209 L 1118 213 L 1118 216 L 1120 220 L 1120 225 L 1116 227 L 1111 227 L 1110 228 L 1103 228 L 1102 229 L 1097 229 L 1096 230 L 1091 230 L 1090 231 L 1086 231 L 1085 232 L 1077 232 L 1076 233 L 1072 233 L 1071 234 L 1066 234 L 1065 235 L 1061 235 L 1060 236 L 1053 236 L 1052 237 L 1047 237 L 1047 240 L 1046 241 L 1046 243 L 1045 244 L 1045 247 L 1044 248 L 1044 250 L 1043 251 L 1043 254 L 1042 255 L 1042 260 L 1041 261 L 1041 263 L 1044 263 L 1045 262 L 1050 262 L 1051 261 L 1058 261 L 1059 260 L 1063 260 L 1064 259 L 1068 259 L 1069 258 L 1073 258 L 1074 257 L 1080 257 L 1081 256 L 1086 256 L 1087 255 L 1092 255 L 1093 254 L 1097 254 L 1098 253 L 1103 253 L 1104 252 L 1111 252 L 1112 251 L 1116 251 L 1117 250 L 1121 250 L 1122 249 L 1126 249 L 1127 248 L 1133 248 L 1134 247 L 1139 247 L 1140 246 L 1144 246 L 1146 243 L 1146 240 L 1147 239 L 1147 231 L 1148 230 L 1148 220 L 1147 219 L 1147 211 L 1146 210 L 1146 207 L 1144 204 L 1144 202 L 1143 201 L 1143 199 L 1141 195 L 1139 193 L 1138 190 L 1134 186 L 1133 183 L 1132 183 L 1129 180 Z
M 1779 171 L 1767 165 L 1765 165 L 1764 164 L 1762 164 L 1758 162 L 1755 162 L 1754 161 L 1747 161 L 1746 160 L 1729 160 L 1728 161 L 1722 161 L 1721 162 L 1718 162 L 1717 163 L 1715 163 L 1711 165 L 1707 165 L 1687 175 L 1685 177 L 1681 179 L 1672 187 L 1671 187 L 1661 197 L 1661 198 L 1657 202 L 1657 203 L 1652 209 L 1651 212 L 1649 214 L 1644 224 L 1643 229 L 1640 235 L 1640 238 L 1639 239 L 1639 244 L 1638 245 L 1638 250 L 1637 251 L 1637 267 L 1638 268 L 1638 273 L 1639 274 L 1639 278 L 1640 279 L 1640 282 L 1648 298 L 1652 302 L 1652 303 L 1655 306 L 1657 307 L 1657 308 L 1659 310 L 1660 310 L 1663 313 L 1669 316 L 1671 318 L 1673 319 L 1675 319 L 1676 320 L 1678 320 L 1684 323 L 1688 323 L 1689 324 L 1696 324 L 1697 325 L 1715 325 L 1716 324 L 1723 324 L 1724 323 L 1728 323 L 1729 322 L 1732 322 L 1738 319 L 1741 319 L 1748 315 L 1750 315 L 1754 313 L 1758 310 L 1759 311 L 1760 309 L 1761 309 L 1764 306 L 1765 306 L 1771 301 L 1772 301 L 1778 295 L 1761 278 L 1760 278 L 1756 282 L 1755 282 L 1751 286 L 1750 286 L 1745 290 L 1737 294 L 1732 295 L 1729 297 L 1726 297 L 1725 298 L 1721 298 L 1720 299 L 1703 299 L 1702 298 L 1698 298 L 1697 297 L 1692 296 L 1684 292 L 1682 290 L 1681 290 L 1673 282 L 1671 278 L 1668 275 L 1668 273 L 1667 272 L 1667 270 L 1666 269 L 1666 267 L 1664 263 L 1664 246 L 1665 245 L 1665 242 L 1666 241 L 1666 239 L 1668 235 L 1668 232 L 1670 228 L 1672 226 L 1673 224 L 1673 222 L 1680 214 L 1680 213 L 1690 203 L 1691 203 L 1694 200 L 1695 200 L 1700 196 L 1712 190 L 1715 190 L 1716 189 L 1718 189 L 1722 187 L 1725 187 L 1726 186 L 1744 186 L 1745 187 L 1747 187 L 1748 188 L 1750 188 L 1751 189 L 1756 190 L 1758 191 L 1761 194 L 1764 195 L 1773 204 L 1773 205 L 1777 210 L 1777 212 L 1778 213 L 1778 215 L 1780 219 L 1780 223 L 1781 225 L 1780 226 L 1775 226 L 1774 227 L 1768 227 L 1767 228 L 1759 228 L 1758 229 L 1753 229 L 1752 230 L 1747 230 L 1746 231 L 1742 231 L 1741 232 L 1733 232 L 1732 233 L 1727 233 L 1726 234 L 1722 234 L 1721 235 L 1717 235 L 1716 236 L 1709 236 L 1707 238 L 1707 241 L 1706 242 L 1706 246 L 1705 247 L 1705 250 L 1703 254 L 1703 258 L 1702 259 L 1702 262 L 1706 262 L 1707 261 L 1714 261 L 1715 260 L 1724 259 L 1725 258 L 1728 258 L 1729 257 L 1735 257 L 1736 256 L 1742 256 L 1743 255 L 1747 255 L 1748 254 L 1752 254 L 1753 253 L 1757 253 L 1758 252 L 1765 252 L 1766 251 L 1771 251 L 1772 250 L 1776 250 L 1777 249 L 1781 249 L 1782 248 L 1789 248 L 1790 247 L 1794 247 L 1795 246 L 1804 245 L 1805 243 L 1805 240 L 1806 239 L 1807 240 L 1807 243 L 1809 244 L 1809 241 L 1808 241 L 1806 238 L 1806 232 L 1807 231 L 1807 217 L 1806 216 L 1806 210 L 1805 209 L 1805 206 L 1802 200 L 1802 198 L 1800 194 L 1798 192 L 1797 189 L 1790 181 L 1790 180 L 1788 179 Z
M 714 187 L 712 189 L 712 190 L 708 193 L 708 194 L 704 198 L 704 199 L 700 203 L 700 204 L 695 210 L 695 212 L 693 214 L 690 220 L 690 222 L 686 229 L 686 233 L 684 237 L 684 240 L 683 241 L 683 245 L 682 246 L 682 268 L 683 269 L 683 273 L 684 274 L 684 276 L 686 280 L 686 283 L 692 295 L 699 303 L 699 304 L 701 306 L 702 306 L 704 308 L 704 309 L 707 310 L 711 314 L 716 316 L 718 318 L 720 319 L 722 319 L 725 321 L 730 322 L 731 323 L 734 323 L 735 324 L 740 324 L 741 325 L 749 325 L 750 326 L 759 326 L 760 325 L 767 325 L 768 324 L 775 324 L 776 323 L 780 323 L 788 319 L 791 319 L 792 318 L 794 318 L 798 315 L 800 315 L 810 309 L 812 310 L 812 313 L 811 314 L 811 319 L 810 320 L 809 325 L 836 325 L 839 319 L 839 316 L 840 315 L 840 310 L 841 309 L 841 307 L 842 306 L 842 303 L 844 299 L 844 295 L 845 294 L 846 287 L 847 286 L 847 284 L 849 280 L 849 275 L 850 274 L 850 271 L 851 270 L 851 268 L 853 264 L 854 255 L 855 254 L 855 252 L 856 251 L 856 248 L 857 247 L 857 244 L 858 243 L 858 217 L 857 216 L 857 212 L 854 206 L 853 201 L 851 197 L 849 195 L 849 193 L 846 190 L 844 186 L 835 177 L 834 177 L 831 174 L 830 174 L 825 170 L 823 170 L 814 165 L 811 165 L 808 163 L 805 163 L 804 162 L 800 162 L 799 161 L 793 161 L 792 160 L 773 160 L 772 161 L 765 161 L 764 162 L 757 163 L 753 165 L 750 165 L 743 169 L 741 169 L 735 172 L 733 174 L 730 175 L 728 177 L 724 179 L 715 187 Z
M 806 192 L 808 194 L 811 195 L 815 199 L 816 199 L 822 206 L 822 207 L 824 209 L 827 215 L 827 217 L 829 221 L 829 226 L 830 227 L 830 240 L 829 241 L 829 246 L 828 247 L 828 250 L 827 251 L 827 253 L 825 256 L 825 258 L 823 262 L 821 264 L 820 267 L 817 270 L 817 271 L 808 281 L 807 281 L 803 285 L 799 287 L 796 290 L 794 290 L 788 294 L 786 294 L 785 295 L 783 295 L 782 296 L 780 296 L 776 298 L 773 298 L 772 299 L 748 299 L 747 298 L 744 298 L 743 297 L 738 296 L 735 294 L 733 294 L 731 292 L 727 290 L 717 280 L 717 279 L 715 277 L 712 271 L 712 269 L 710 265 L 710 262 L 709 261 L 709 245 L 710 244 L 710 240 L 711 239 L 711 237 L 712 236 L 713 231 L 717 223 L 719 221 L 720 218 L 724 214 L 724 213 L 734 203 L 735 203 L 739 199 L 742 198 L 744 196 L 756 190 L 758 190 L 762 188 L 765 188 L 766 187 L 769 187 L 770 186 L 788 186 L 789 187 L 792 187 L 796 189 L 799 189 L 800 190 L 802 190 Z
M 1192 121 L 1190 122 L 1190 124 L 1189 125 L 1189 129 L 1188 130 L 1188 132 L 1186 136 L 1186 139 L 1185 140 L 1184 147 L 1183 148 L 1183 150 L 1181 154 L 1181 157 L 1180 158 L 1180 162 L 1179 163 L 1179 165 L 1178 166 L 1178 168 L 1176 172 L 1176 176 L 1175 177 L 1175 179 L 1173 183 L 1173 186 L 1172 187 L 1171 194 L 1170 195 L 1170 197 L 1168 201 L 1168 204 L 1167 205 L 1167 209 L 1166 210 L 1166 212 L 1164 216 L 1164 219 L 1163 220 L 1162 227 L 1160 231 L 1160 234 L 1159 235 L 1158 242 L 1157 243 L 1157 245 L 1155 249 L 1155 252 L 1154 253 L 1154 259 L 1153 260 L 1153 276 L 1154 277 L 1154 282 L 1155 283 L 1155 286 L 1158 292 L 1158 294 L 1161 298 L 1162 301 L 1173 313 L 1174 313 L 1182 319 L 1184 319 L 1189 322 L 1191 322 L 1195 324 L 1199 324 L 1200 325 L 1236 325 L 1236 323 L 1237 322 L 1237 319 L 1238 318 L 1238 315 L 1239 314 L 1239 311 L 1240 310 L 1240 307 L 1241 306 L 1241 303 L 1242 302 L 1242 300 L 1241 299 L 1209 299 L 1208 298 L 1205 298 L 1195 293 L 1187 285 L 1186 282 L 1183 278 L 1183 275 L 1182 274 L 1182 271 L 1181 270 L 1181 257 L 1182 256 L 1182 253 L 1183 252 L 1183 248 L 1184 247 L 1184 245 L 1186 241 L 1186 238 L 1187 237 L 1187 233 L 1188 232 L 1188 230 L 1189 229 L 1189 227 L 1191 223 L 1191 220 L 1192 219 L 1192 215 L 1193 214 L 1193 211 L 1195 207 L 1195 204 L 1196 203 L 1196 199 L 1197 198 L 1197 195 L 1198 194 L 1198 192 L 1200 190 L 1278 190 L 1279 189 L 1279 187 L 1281 183 L 1281 180 L 1282 179 L 1282 177 L 1283 176 L 1283 174 L 1285 170 L 1285 166 L 1286 165 L 1285 164 L 1269 164 L 1268 165 L 1239 165 L 1238 164 L 1221 164 L 1220 165 L 1210 165 L 1209 164 L 1207 164 L 1206 163 L 1207 162 L 1207 159 L 1209 155 L 1209 152 L 1210 151 L 1210 147 L 1211 146 L 1211 144 L 1213 140 L 1214 133 L 1216 129 L 1217 122 L 1216 121 Z
M 997 121 L 978 121 L 977 122 L 960 122 L 959 123 L 952 124 L 948 126 L 945 126 L 938 130 L 936 130 L 931 134 L 928 135 L 925 138 L 922 139 L 917 144 L 916 144 L 907 153 L 907 154 L 903 158 L 903 159 L 897 166 L 888 184 L 888 186 L 886 190 L 886 193 L 884 197 L 884 200 L 882 204 L 882 209 L 881 210 L 881 213 L 880 214 L 880 216 L 878 220 L 878 224 L 877 225 L 876 232 L 875 233 L 875 235 L 873 239 L 873 244 L 871 248 L 871 251 L 869 255 L 869 259 L 868 260 L 868 263 L 867 264 L 867 266 L 866 267 L 866 270 L 864 274 L 864 279 L 863 280 L 863 282 L 862 283 L 862 285 L 860 289 L 860 294 L 859 295 L 859 298 L 857 301 L 857 304 L 856 305 L 856 308 L 855 309 L 855 313 L 854 314 L 854 316 L 853 317 L 853 320 L 851 324 L 852 325 L 878 325 L 879 324 L 879 322 L 880 321 L 880 317 L 881 316 L 881 314 L 883 310 L 883 307 L 884 306 L 885 299 L 887 295 L 887 292 L 888 291 L 889 284 L 891 280 L 891 277 L 892 276 L 892 273 L 893 272 L 894 265 L 896 261 L 896 258 L 897 257 L 897 254 L 898 253 L 898 249 L 899 248 L 899 246 L 901 242 L 901 239 L 902 238 L 903 231 L 905 227 L 905 224 L 906 223 L 906 219 L 907 218 L 908 211 L 910 207 L 910 204 L 911 203 L 911 199 L 912 198 L 912 196 L 914 194 L 980 194 L 982 192 L 982 188 L 983 187 L 984 180 L 986 176 L 986 173 L 988 172 L 987 170 L 987 168 L 930 168 L 929 167 L 937 159 L 938 159 L 941 156 L 942 156 L 944 154 L 946 154 L 948 152 L 952 150 L 955 150 L 956 149 L 959 149 L 960 148 L 964 148 L 965 147 L 992 147 L 993 146 L 993 144 L 995 140 L 995 136 L 996 135 L 996 130 L 998 126 L 998 122 Z
M 1844 120 L 1842 124 L 1842 127 L 1841 128 L 1841 131 L 1840 132 L 1840 136 L 1839 137 L 1839 140 L 1838 141 L 1838 144 L 1837 145 L 1837 149 L 1835 153 L 1835 157 L 1834 158 L 1834 161 L 1832 165 L 1832 168 L 1831 169 L 1831 173 L 1830 174 L 1830 177 L 1828 181 L 1828 184 L 1827 185 L 1827 188 L 1826 189 L 1826 193 L 1824 197 L 1824 200 L 1823 201 L 1823 204 L 1822 205 L 1822 209 L 1821 210 L 1821 213 L 1820 214 L 1820 216 L 1819 217 L 1819 220 L 1818 221 L 1818 224 L 1817 225 L 1817 230 L 1815 234 L 1815 237 L 1813 241 L 1813 245 L 1812 246 L 1812 249 L 1811 250 L 1811 253 L 1810 254 L 1810 259 L 1809 260 L 1809 275 L 1810 276 L 1810 280 L 1811 281 L 1811 284 L 1812 285 L 1812 287 L 1813 288 L 1814 293 L 1817 297 L 1818 300 L 1821 303 L 1821 304 L 1831 314 L 1834 315 L 1839 319 L 1841 319 L 1849 323 L 1852 323 L 1853 324 L 1858 324 L 1859 325 L 1890 325 L 1891 324 L 1891 321 L 1892 320 L 1892 317 L 1893 316 L 1893 313 L 1894 312 L 1894 309 L 1895 308 L 1896 299 L 1865 299 L 1864 298 L 1861 298 L 1854 294 L 1852 294 L 1848 290 L 1847 290 L 1846 288 L 1842 284 L 1841 281 L 1839 279 L 1837 275 L 1837 270 L 1836 269 L 1836 258 L 1837 257 L 1837 250 L 1838 249 L 1838 246 L 1840 242 L 1840 239 L 1841 238 L 1841 235 L 1842 234 L 1842 230 L 1844 226 L 1844 223 L 1845 222 L 1845 219 L 1846 218 L 1846 214 L 1847 213 L 1847 210 L 1848 209 L 1848 207 L 1849 206 L 1849 203 L 1850 202 L 1850 199 L 1851 198 L 1851 193 L 1853 189 L 1924 189 L 1925 188 L 1925 185 L 1926 184 L 1926 180 L 1927 179 L 1927 176 L 1928 175 L 1928 172 L 1929 171 L 1930 164 L 1929 163 L 1860 163 L 1859 162 L 1860 161 L 1861 154 L 1862 153 L 1862 151 L 1863 150 L 1863 147 L 1864 146 L 1864 141 L 1865 140 L 1865 138 L 1866 137 L 1866 134 L 1868 130 L 1868 126 L 1869 125 L 1869 120 Z
M 675 120 L 575 120 L 574 121 L 567 121 L 566 122 L 563 122 L 562 123 L 559 123 L 558 124 L 556 124 L 555 125 L 550 126 L 538 132 L 536 134 L 532 136 L 528 140 L 527 140 L 526 142 L 522 145 L 522 146 L 518 150 L 516 154 L 513 157 L 513 159 L 508 168 L 508 173 L 507 174 L 507 177 L 506 178 L 506 194 L 507 195 L 508 202 L 510 205 L 510 207 L 512 209 L 514 214 L 517 217 L 517 218 L 520 221 L 521 221 L 522 223 L 523 223 L 529 228 L 533 230 L 535 230 L 538 232 L 543 233 L 544 234 L 551 234 L 552 235 L 615 235 L 616 234 L 618 234 L 619 235 L 624 235 L 625 236 L 627 236 L 635 240 L 641 247 L 643 251 L 643 253 L 644 254 L 644 267 L 643 268 L 643 271 L 642 272 L 642 274 L 641 276 L 639 278 L 637 282 L 630 289 L 629 289 L 627 291 L 626 291 L 622 294 L 620 294 L 616 296 L 613 296 L 612 297 L 487 297 L 485 299 L 485 302 L 483 306 L 483 310 L 482 311 L 482 314 L 481 315 L 481 319 L 480 320 L 480 325 L 607 325 L 608 324 L 614 324 L 615 323 L 619 323 L 627 319 L 630 319 L 634 317 L 636 315 L 638 315 L 640 313 L 641 313 L 649 306 L 650 306 L 653 303 L 654 301 L 655 301 L 655 300 L 662 292 L 662 290 L 664 288 L 667 282 L 667 280 L 668 279 L 668 277 L 670 273 L 670 270 L 671 269 L 671 248 L 670 247 L 670 244 L 669 243 L 668 238 L 665 232 L 662 229 L 661 226 L 655 220 L 654 220 L 648 215 L 640 211 L 638 211 L 637 210 L 633 210 L 632 209 L 627 209 L 626 208 L 553 208 L 552 207 L 550 207 L 544 204 L 537 197 L 535 193 L 534 188 L 533 187 L 533 180 L 534 179 L 534 176 L 537 170 L 537 168 L 539 166 L 539 165 L 549 155 L 554 153 L 558 150 L 561 150 L 562 149 L 565 149 L 566 148 L 570 148 L 571 147 L 670 147 L 671 146 L 671 141 L 672 140 L 672 137 L 674 133 L 674 129 L 675 128 L 675 124 L 676 123 L 676 121 Z
M 333 132 L 331 134 L 328 135 L 326 137 L 321 139 L 311 148 L 310 148 L 296 163 L 296 164 L 290 172 L 288 177 L 286 179 L 286 181 L 282 188 L 281 193 L 279 196 L 279 198 L 277 202 L 277 206 L 276 207 L 276 212 L 275 213 L 275 220 L 274 221 L 274 237 L 275 238 L 275 244 L 276 245 L 277 254 L 278 255 L 279 260 L 281 263 L 282 268 L 286 276 L 288 278 L 289 281 L 294 287 L 294 288 L 305 300 L 306 300 L 311 305 L 315 307 L 318 310 L 320 310 L 323 313 L 327 315 L 329 315 L 336 319 L 339 319 L 340 320 L 342 320 L 343 321 L 345 321 L 349 323 L 353 323 L 354 324 L 363 324 L 364 325 L 434 325 L 435 324 L 435 319 L 436 318 L 436 309 L 437 308 L 437 301 L 438 300 L 438 298 L 437 297 L 364 297 L 363 296 L 354 295 L 348 292 L 346 292 L 340 289 L 338 287 L 335 286 L 332 283 L 331 283 L 322 275 L 322 274 L 315 266 L 312 260 L 310 258 L 310 256 L 306 249 L 306 245 L 305 244 L 305 241 L 304 240 L 304 237 L 303 236 L 303 216 L 304 215 L 304 211 L 305 210 L 306 203 L 315 185 L 317 183 L 319 179 L 324 174 L 324 173 L 326 172 L 329 168 L 330 168 L 334 164 L 337 163 L 340 160 L 345 158 L 347 156 L 351 154 L 356 153 L 359 151 L 361 151 L 362 150 L 367 150 L 368 149 L 373 149 L 374 148 L 445 148 L 447 144 L 447 136 L 448 135 L 448 124 L 449 122 L 447 120 L 378 120 L 377 121 L 367 121 L 366 122 L 362 122 L 361 123 L 358 123 L 357 124 L 350 125 L 342 129 L 340 129 L 337 131 L 335 131 Z
M 181 132 L 179 134 L 174 136 L 172 138 L 168 140 L 165 143 L 164 143 L 159 148 L 158 148 L 156 150 L 156 151 L 154 152 L 152 154 L 152 155 L 147 160 L 147 161 L 143 165 L 143 166 L 139 171 L 138 174 L 136 176 L 130 188 L 130 190 L 129 191 L 129 193 L 128 194 L 128 196 L 126 200 L 126 203 L 125 204 L 125 208 L 124 209 L 124 213 L 123 214 L 123 222 L 122 223 L 122 232 L 123 233 L 123 241 L 124 242 L 124 246 L 125 247 L 125 252 L 126 253 L 126 256 L 129 262 L 130 267 L 135 277 L 137 279 L 138 282 L 144 289 L 144 290 L 156 302 L 157 302 L 160 305 L 164 307 L 167 310 L 167 311 L 169 310 L 174 314 L 176 315 L 178 315 L 185 319 L 188 319 L 189 320 L 191 320 L 195 322 L 198 322 L 199 323 L 204 323 L 205 324 L 214 324 L 215 325 L 286 325 L 287 324 L 287 319 L 288 318 L 288 302 L 289 301 L 289 298 L 288 297 L 214 297 L 213 296 L 208 296 L 207 295 L 200 294 L 195 291 L 193 291 L 189 289 L 187 287 L 184 286 L 178 281 L 177 281 L 168 272 L 168 271 L 164 267 L 163 264 L 159 259 L 159 257 L 155 250 L 155 248 L 154 247 L 154 243 L 152 239 L 152 233 L 151 232 L 151 221 L 152 220 L 152 214 L 153 213 L 153 210 L 154 209 L 154 205 L 157 199 L 157 197 L 159 194 L 159 192 L 163 187 L 163 185 L 167 181 L 168 178 L 170 177 L 171 175 L 184 163 L 185 163 L 190 159 L 200 154 L 202 154 L 205 152 L 207 152 L 210 150 L 215 150 L 216 149 L 222 149 L 223 148 L 295 148 L 296 147 L 296 140 L 297 139 L 297 128 L 298 127 L 298 121 L 297 120 L 227 120 L 226 121 L 215 121 L 214 122 L 209 122 L 208 123 L 205 123 L 201 125 L 198 125 L 197 126 L 192 127 L 185 131 L 183 131 Z
M 1506 121 L 1499 127 L 1497 131 L 1497 138 L 1496 139 L 1496 143 L 1495 144 L 1495 147 L 1494 148 L 1494 151 L 1493 152 L 1493 155 L 1492 156 L 1491 163 L 1489 167 L 1489 170 L 1488 171 L 1488 175 L 1487 176 L 1487 179 L 1485 183 L 1485 186 L 1484 187 L 1484 190 L 1483 191 L 1483 195 L 1482 196 L 1482 199 L 1481 200 L 1481 202 L 1480 203 L 1480 206 L 1479 207 L 1479 212 L 1478 213 L 1478 216 L 1476 220 L 1476 223 L 1475 224 L 1475 227 L 1474 228 L 1474 232 L 1473 233 L 1472 240 L 1470 244 L 1470 249 L 1469 250 L 1468 257 L 1466 261 L 1466 265 L 1465 266 L 1465 270 L 1464 271 L 1464 274 L 1463 275 L 1463 277 L 1462 278 L 1462 281 L 1461 282 L 1461 287 L 1460 288 L 1460 290 L 1459 291 L 1459 294 L 1457 298 L 1456 307 L 1455 308 L 1455 311 L 1454 312 L 1454 314 L 1453 315 L 1453 318 L 1452 319 L 1452 325 L 1478 325 L 1479 324 L 1479 321 L 1481 317 L 1481 312 L 1482 311 L 1482 308 L 1483 307 L 1483 304 L 1484 303 L 1484 300 L 1485 299 L 1485 296 L 1486 295 L 1486 290 L 1488 286 L 1488 283 L 1489 282 L 1489 279 L 1490 278 L 1490 274 L 1491 273 L 1491 270 L 1492 269 L 1492 267 L 1493 266 L 1493 263 L 1494 262 L 1495 253 L 1496 252 L 1496 249 L 1497 248 L 1497 245 L 1498 244 L 1498 241 L 1499 240 L 1499 235 L 1500 234 L 1500 232 L 1502 228 L 1502 225 L 1503 224 L 1503 220 L 1504 219 L 1504 216 L 1506 212 L 1506 209 L 1507 208 L 1507 205 L 1508 204 L 1508 199 L 1509 198 L 1509 195 L 1511 191 L 1511 188 L 1512 187 L 1512 183 L 1513 182 L 1513 179 L 1515 175 L 1516 168 L 1517 167 L 1519 169 L 1519 171 L 1520 172 L 1521 170 L 1521 167 L 1519 165 L 1518 167 L 1517 166 L 1518 159 L 1520 156 L 1522 159 L 1522 162 L 1523 163 L 1524 170 L 1525 171 L 1525 173 L 1527 177 L 1527 180 L 1528 181 L 1528 183 L 1530 187 L 1530 190 L 1532 194 L 1532 197 L 1533 198 L 1533 200 L 1534 201 L 1534 203 L 1536 207 L 1536 211 L 1537 212 L 1537 215 L 1538 216 L 1538 218 L 1539 219 L 1539 221 L 1541 225 L 1541 229 L 1542 230 L 1542 232 L 1543 233 L 1543 235 L 1545 239 L 1546 246 L 1547 247 L 1547 249 L 1548 250 L 1548 252 L 1550 256 L 1550 261 L 1551 262 L 1551 264 L 1552 265 L 1552 267 L 1554 271 L 1555 278 L 1556 279 L 1556 281 L 1558 285 L 1558 288 L 1559 289 L 1560 296 L 1561 297 L 1561 299 L 1563 303 L 1563 307 L 1564 308 L 1564 310 L 1566 314 L 1568 316 L 1568 317 L 1570 319 L 1571 319 L 1573 321 L 1577 323 L 1579 323 L 1580 324 L 1595 324 L 1596 323 L 1598 323 L 1606 318 L 1610 310 L 1610 306 L 1612 302 L 1612 299 L 1613 298 L 1613 296 L 1614 295 L 1614 292 L 1615 291 L 1615 287 L 1616 286 L 1616 284 L 1617 283 L 1617 280 L 1619 276 L 1619 272 L 1620 271 L 1620 269 L 1621 268 L 1621 265 L 1623 261 L 1623 258 L 1624 257 L 1624 253 L 1625 252 L 1625 250 L 1627 246 L 1627 243 L 1628 242 L 1628 238 L 1629 237 L 1629 235 L 1631 231 L 1631 228 L 1632 227 L 1632 223 L 1633 222 L 1633 220 L 1634 219 L 1634 216 L 1635 215 L 1635 213 L 1637 209 L 1637 205 L 1638 204 L 1638 202 L 1639 201 L 1639 198 L 1641 194 L 1641 190 L 1642 189 L 1642 186 L 1643 185 L 1643 183 L 1645 179 L 1646 172 L 1647 171 L 1647 169 L 1648 168 L 1648 165 L 1650 161 L 1650 157 L 1651 156 L 1651 154 L 1652 153 L 1652 151 L 1654 147 L 1654 144 L 1655 143 L 1655 139 L 1656 138 L 1656 136 L 1657 135 L 1657 133 L 1659 129 L 1659 125 L 1661 122 L 1661 120 L 1660 119 L 1635 119 L 1632 123 L 1632 125 L 1631 126 L 1631 129 L 1630 130 L 1630 134 L 1629 135 L 1629 137 L 1627 141 L 1627 144 L 1626 145 L 1626 149 L 1625 150 L 1625 152 L 1624 153 L 1624 155 L 1622 159 L 1622 162 L 1621 163 L 1621 167 L 1620 168 L 1620 170 L 1618 174 L 1618 177 L 1617 178 L 1617 182 L 1616 183 L 1616 185 L 1614 189 L 1614 192 L 1612 196 L 1612 200 L 1611 201 L 1611 203 L 1610 204 L 1610 207 L 1608 211 L 1608 215 L 1606 219 L 1606 222 L 1604 226 L 1604 229 L 1603 230 L 1602 237 L 1600 241 L 1600 244 L 1599 245 L 1599 249 L 1598 250 L 1598 253 L 1597 254 L 1597 256 L 1595 260 L 1595 264 L 1594 265 L 1594 268 L 1592 272 L 1592 275 L 1590 278 L 1588 274 L 1587 274 L 1587 277 L 1590 281 L 1590 284 L 1588 288 L 1586 287 L 1586 285 L 1585 284 L 1585 281 L 1583 277 L 1583 273 L 1582 272 L 1582 270 L 1581 269 L 1581 267 L 1579 263 L 1579 260 L 1578 259 L 1578 256 L 1577 255 L 1577 253 L 1575 249 L 1575 246 L 1574 245 L 1573 238 L 1572 237 L 1572 235 L 1570 231 L 1569 224 L 1568 223 L 1568 221 L 1566 217 L 1565 210 L 1564 209 L 1564 207 L 1562 203 L 1562 200 L 1561 199 L 1560 192 L 1559 191 L 1559 189 L 1557 185 L 1557 182 L 1556 181 L 1556 179 L 1555 178 L 1555 176 L 1553 172 L 1552 165 L 1550 161 L 1550 158 L 1548 154 L 1548 151 L 1547 150 L 1547 147 L 1545 143 L 1545 140 L 1544 139 L 1543 134 L 1541 130 L 1534 123 L 1530 121 L 1528 121 L 1524 119 L 1513 119 L 1512 120 L 1509 120 L 1508 121 Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>
</a></h1>
      </div>
      <nav class="sidenav" aria-label="Sections">
        <a href="#overview" data-nav="overview" title="Overview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="16" width="7" height="5" rx="1.5"></rect></svg><span class="sr-only-collapse">Overview</span></a>
        <a href="#activity" data-nav="activity" title="Activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"></path></svg><span class="sr-only-collapse">Activity</span></a>
        <a href="#policy" data-nav="policy" title="Policy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"></path></svg><span class="sr-only-collapse">Policy</span></a>
        <a href="#rules" data-nav="rules" title="Rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4"></path><path d="M9 12h6M9 16h4"></path></svg><span class="sr-only-collapse">Rules</span></a>
        <a href="#integrations" data-nav="integrations" title="Integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"></path></svg><span class="sr-only-collapse">Integrations</span></a>
        <a href="#settings" data-nav="settings" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"></path><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle></svg><span class="sr-only-collapse">Settings</span></a>
      </nav>
      <div class="sidebar-foot">
        <div class="sidebar-links">
          <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
          <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
        </div>
      </div>
    </aside>
    <div class="content">
      <header class="topbar" id="topbar">
        <div class="topbar-row">
          <h2 class="topbar-title" id="topbar-title">Overview</h2>
          <label class="view-search topbar-search" data-search-view="activity" hidden>
            <span class="sr-only">Filter activity</span>
            <input type="search" id="activity-search" autocomplete="off" placeholder="Filter by rule or command">
          </label>
          <label class="view-search topbar-search" data-search-view="policy" hidden>
            <span class="sr-only">Search all protections</span>
            <input type="search" id="policy-search" autocomplete="off" placeholder="Filter by name, category, or rule ID">
          </label>
          <div class="topbar-actions">
            <div class="app-status" id="app-status" role="status" aria-live="polite">Loading...</div>
            <button type="button" class="dirty-chip" id="dirty-chip" hidden>Unsaved policy changes · Review</button>
          </div>
        </div>
      </header>
      <main>
        <div class="protection-banner" id="protection-banner" role="alert" hidden></div>
        <div class="status" id="status" role="status" aria-live="polite"></div>

        <section class="view" data-view="overview">
          <div class="view-head">
            <p class="panel-sub muted">What CC Safety Net has been doing on this machine.</p>
          </div>
          <div class="status health-strip" id="health-strip" hidden></div>
          <p class="tiles-window" id="overview-window"></p>
          <div class="tiles" id="overview-tiles"></div>
          <div class="star-row" id="star-row" hidden>
            <p class="star-pitch"><span id="star-pitch-text"></span> <span class="star-mechanism" id="star-mechanism" hidden>One click via your GitHub CLI. No redirect.</span></p>
            <span id="star-slot"></span>
          </div>
          <section class="panel" id="protection-card" hidden></section>
          <div class="dual-panels">
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked commands</h2>
                </div>
              </div>
              <div id="top-commands"></div>
            </section>
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked rules</h2>
                </div>
              </div>
              <div id="top-rules"></div>
            </section>
          </div>
          <button type="button" class="guard-errors" id="guard-errors" hidden></button>
        </section>

        <section class="view" data-view="activity" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Audited commands from the local log, newest first. Commands are secret-redacted at write time.</p>
          </div>
          <section class="panel">
            <div class="activity-controls">
              <div class="activity-controls-row">
                <label class="activity-days"><span>Window</span>
                  <select id="activity-days"></select>
                </label>
                <button type="button" class="icon-button activity-refresh" id="activity-refresh" aria-label="Refresh activity" title="Refresh activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
              </div>
              <div class="chip-row" id="activity-decision" role="group" aria-label="Filter by decision"></div>
              <div class="chip-row" id="activity-agents" role="group" aria-label="Filter by agent"></div>
              <div class="chip-row" id="activity-command-filter"></div>
            </div>
            <div id="activity-feed"></div>
            <p class="muted activity-count" id="activity-count"></p>
          </section>
        </section>

        <section class="view" data-view="policy" hidden>
          <div class="view-head view-head-actions">
            <p class="panel-sub muted">Choose what CC Safety Net blocks. Changes apply after you save.</p>
            <button type="button" id="project-draft-enter">Draft project policy</button>
          </div>
          <div class="project-draft-bar" id="project-draft-bar" hidden>
            <div class="project-draft-target">
              <strong>Project policy draft</strong>
              <code id="project-draft-path"></code>
              <p class="muted">Only the fields you mark are written here; everything else keeps inheriting from each member's own policy.</p>
            </div>
            <div class="savebar-actions">
              <button type="button" id="project-draft-change" hidden>Change…</button>
              <button type="button" id="project-draft-exit">Exit draft</button>
            </div>
          </div>
          <p class="status error" id="project-draft-diagnostics" hidden></p>
          <div class="policy-savebar" id="policy-savebar" hidden><span>Unsaved changes</span><div class="savebar-actions"><button type="button" id="discard-changes">Discard</button><button class="primary" id="save">Save</button></div></div>
          <div class="recovery" id="recovery" hidden>
            <div>
              <strong>Policy repair available</strong>
              <p class="muted">Repair writes canonical JSON by preserving valid settings. If the JSON cannot be parsed, defaults are restored.</p>
            </div>
            <button class="primary" id="repair" type="button">Repair</button>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2 id="tester-label">Test a command</h2>
                <p class="panel-sub muted">Paste a shell command to see whether it is blocked under your current unsaved edits. Custom rulebook rules are enforced here too.</p>
              </div>
            </div>
            <div class="tester-row">
              <input type="text" id="tester-input" autocomplete="off" spellcheck="false" placeholder="Paste a shell command and press Enter" aria-labelledby="tester-label">
              <button type="button" id="tester-run">Test</button>
            </div>
            <div id="tester-result" class="status" hidden></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Safety preset</h2>
                <p class="panel-sub muted">Choose inherited protection defaults, then customize only what this workspace needs.</p>
              </div>
            </div>
            <div id="safety-preset-status" class="preset-status"></div>
            <div id="environment-overrides" class="status" hidden></div>
            <div class="grid" id="safety-level"></div>
            <div class="field field-toggle">
              <button class="panel-toggle" type="button" aria-expanded="false" aria-controls="safety-overrides-content"><span class="panel-chevron" aria-hidden="true"></span><span>Advanced overrides</span></button>
            </div>
            <div class="foldable-field-content" id="safety-overrides-content" hidden>
              <p class="muted">Inherit from the selected level unless a capability needs an explicit exception.</p>
              <div class="grid" id="safety-overrides"></div>
            </div>
            <div class="field">
              <span>Workflow</span>
              <small>Workflow exceptions are separate from safety level.</small>
            </div>
            <div class="grid" id="workflow"></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Destructive Command Protection</h2>
                <p class="panel-sub muted" id="destructive-command-summary"></p>
              </div>
              <button type="button" id="reset-rule-customizations" class="panel-head-action">Restore defaults</button>
            </div>
            <div id="destructive-command"></div>
          </section>
          <section class="panel">
            <header class="panel-head">
              <div class="panel-title">
                <h2>Secret Protection</h2>
                <p class="panel-sub muted" id="secret-summary">Default sensitive paths and coding CLI credential locations can be disabled individually. Deny paths are blocked while Secret protection is on.</p>
              </div>
              <button type="button" id="reset-secret-customizations" class="panel-head-action">Restore defaults</button>
            </header>
            <div id="secret"></div>
          </section>
          <section class="panel">
            <div class="panel-head raw-json-head">
              <div class="panel-title">
                <h2>Policy JSON</h2>
                <p class="panel-sub muted" id="raw-source">Read-only mirror of the policy controls.</p>
              </div>
              <button class="icon-button" id="raw-copy" type="button" aria-label="Copy raw JSON to clipboard"></button>
            </div>
            <textarea id="raw" aria-label="Raw policy JSON" aria-describedby="raw-source" readonly></textarea>
          </section>
        </section>

        <section class="view" data-view="rules" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Custom rulebook rules enforced on this machine, and a prompt to hand rule authoring to your coding agent.</p>
          </div>
          <section class="panel" id="rules-composer-panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Create a rule</h2>
                <p class="panel-sub muted">CC Safety Net never writes rulebooks from here. Copy the prompt and paste it into your coding agent.</p>
              </div>
            </div>
            <div class="field">
              <span>Scope</span>
              <div class="chip-row" role="group" aria-label="Rule scope">
                <button type="button" class="chip" data-rules-scope="project" aria-pressed="true">Project</button>
                <button type="button" class="chip" data-rules-scope="user" aria-pressed="false">All projects</button>
              </div>
            </div>
            <div class="field" id="rules-project-path-field">
              <span id="rules-project-path-label">Project path</span>
              <div class="rules-path-row">
                <input type="text" id="rules-project-path" spellcheck="false" autocomplete="off" aria-labelledby="rules-project-path-label" aria-describedby="rules-project-path-hint">
                <button type="button" id="rules-choose-directory" hidden>Choose…</button>
              </div>
              <small id="rules-project-path-hint">Where the rulebook is written. Defaults to the directory this GUI was launched from.</small>
            </div>
            <div class="field">
              <span id="rules-composer-label">Request</span>
              <textarea id="rules-composer-input" spellcheck="false" placeholder="Describe the custom rules you want..." aria-labelledby="rules-composer-label" aria-describedby="rules-composer-hint"></textarea>
              <small id="rules-composer-hint">Rules match a command, its subcommand path, and exact arguments - not file paths or patterns.</small>
            </div>
            <div class="field">
              <span>Examples</span>
              <div class="chip-row">
                <button type="button" class="chip" data-rules-example="read my package.json and suggest blocking rules">Suggest rules</button>
                <button type="button" class="chip" data-rules-example="set up rules to block all terraform destroy commands">Block a command</button>
                <button type="button" class="chip" data-rules-example="verify my rules and fix any errors">Verify rules</button>
              </div>
            </div>
            <div class="rules-composer-actions">
              <button type="button" class="primary" id="rules-copy-prompt">Copy prompt</button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Rulebooks</h2>
                <p class="panel-sub muted">Read-only. Rules are shown as enforced, after overrides.</p>
              </div>
              <button type="button" class="icon-button rules-refresh" id="rules-refresh" aria-label="Refresh rules" title="Refresh rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="rules-list"><p class="empty">Loading rules…</p></div>
          </section>
          <section class="panel" id="rules-diagnostics-panel" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>Diagnostics</h2>
                <p class="panel-sub muted">Errors mean a rulebook was dropped and its rules are not enforced.</p>
              </div>
            </div>
            <div id="rules-diagnostics"></div>
          </section>
        </section>

        <section class="view" data-view="settings" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Appearance, file locations, and maintenance.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Appearance</h2>
                <p class="panel-sub muted">Theme preference is stored in this browser.</p>
              </div>
              <button type="button" id="theme-toggle"></button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Files</h2>
                <p class="panel-sub muted">Where CC Safety Net reads and writes on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>Policy file</span><code id="policy-path"></code></div>
              <div class="info-row" id="project-policy-row" hidden><span>Project policy</span><code id="project-policy-path"></code></div>
              <div class="info-row"><span>Audit logs</span><code id="logs-path"></code></div>
            </div>
            <p class="status" id="project-policy-notice" hidden></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Audit log retention</h2>
                <p class="panel-sub muted">How long decisions are kept before the sweep deletes them. Every analyzed command is recorded, so a long window grows the log.</p>
              </div>
            </div>
            <label class="retention-row">
              <span>Keep for</span>
              <input type="number" id="retention-days" min="1" max="365" step="1" inputmode="numeric" aria-describedby="retention-note">
              <span id="retention-unit">days</span>
            </label>
            <p class="muted retention-note" id="retention-note"></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Version</h2>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><code id="app-version"></code></div>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Danger zone</h2>
                <p class="panel-sub muted">Actions that discard saved configuration.</p>
              </div>
            </div>
            <div class="danger-row">
              <div>
                <strong>Reset policy</strong>
                <p class="muted">Restore the default policy JSON at the configured path.</p>
              </div>
              <button class="danger" id="reset">Reset</button>
            </div>
          </section>
        </section>

        <section class="view" data-view="integrations" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Install or remove the cc-safety-net hook for each coding agent on this machine.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Agents</h2>
                <p class="panel-sub muted">Detected CLIs and hook status.</p>
              </div>
              <button type="button" class="icon-button integrations-refresh" id="integrations-refresh" aria-label="Refresh integrations" title="Refresh integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="integrations-list"><p class="empty">Checking integrations…</p></div>
          </section>
          <section class="panel" id="integrations-system" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>System</h2>
                <p class="panel-sub muted">Runtime detected on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>cc-safety-net</span><code id="integrations-pkg-version"></code></div>
              <div class="info-row"><span>Node.js</span><code id="integrations-node-version"></code></div>
              <div class="info-row"><span>Platform</span><code id="integrations-platform"></code></div>
            </div>
          </section>
        </section>
      </main>
      <footer class="app-foot">
        <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
      </footer>
    </div>
  </div>
  <div class="rule-example-popover" id="rule-example-popover" popover="auto" role="dialog" aria-labelledby="rule-example-title" aria-describedby="rule-example-command">
    <span class="rule-example-label" id="rule-example-label">Blocked command example</span>
    <strong id="rule-example-title"></strong>
    <code id="rule-example-command"></code>
  </div>
  <dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-body confirm-dialog-detail">
    <form method="dialog">
      <h2 id="confirm-dialog-title"></h2>
      <p class="muted" id="confirm-dialog-body"></p>
      <div class="dialog-rows" id="confirm-dialog-rows" hidden></div>
      <p class="dialog-detail"><code id="confirm-dialog-detail"></code></p>
      <div class="dialog-actions">
        <button type="submit" id="confirm-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="danger" id="confirm-dialog-confirm" value="confirm"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog report-dialog" id="report-dialog" aria-labelledby="report-dialog-title" aria-describedby="report-dialog-body">
    <form method="dialog">
      <h2 id="report-dialog-title">Report false positive</h2>
      <p class="muted" id="report-dialog-body">This opens a prefilled GitHub issue form — it is public, and nothing is submitted until you submit it there. Paths were replaced with <code>&lt;project&gt;</code> and <code>~</code>; edit anything else you would rather not publish.</p>
      <label class="report-field"><span>Blocked command</span><textarea id="report-command" spellcheck="false"></textarea></label>
      <label class="report-field"><span>Audit log entry</span><textarea id="report-entry" spellcheck="false"></textarea></label>
      <div class="dialog-actions">
        <button type="submit" id="report-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="primary" id="report-dialog-open" value="report">Open GitHub form</button>
      </div>
    </form>
  </dialog>
  <script id="ccsn-data" type="application/json"></script>
  <script>
// src/audit/display.ts
var formatRelativeTime = (value) => {
  const diff = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(diff))
    return "";
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0)
    return \`\${days}d ago\`;
  if (hours > 0)
    return \`\${hours}h ago\`;
  if (minutes > 0)
    return \`\${minutes}m ago\`;
  return "just now";
};
var commandSignature = (source) => {
  const tokens = (source ?? "").trim().split(/\\s+/).filter((token) => token && !/^[A-Za-z_][A-Za-z0-9_]*=/.test(token));
  const binary = tokens[0]?.split("/").pop();
  if (!binary)
    return null;
  const next = tokens[1];
  return next && /^[a-z][a-z0-9-]*$/.test(next) ? \`\${binary} \${next}\` : binary;
};
function findSuspectEntries(entries) {
  const signatureKey = (entry) => \`\${entry.sessionId}
\${commandSignature(entry.segment || entry.command)}\`;
  const denials = entries.filter((entry) => entry.decision !== "allow");
  const repeats = denials.filter((entry) => entry.sessionId).reduce((counts, entry) => counts.set(signatureKey(entry), (counts.get(signatureKey(entry)) ?? 0) + 1), new Map);
  return new Set(denials.filter((entry) => entry.failureStage || (repeats.get(signatureKey(entry)) ?? 0) >= 2));
}

// src/core/policy/audit-retention-days.ts
var DEFAULT_AUDIT_RETENTION_DAYS = 30;
var MIN_AUDIT_RETENTION_DAYS = 1;
var MAX_AUDIT_RETENTION_DAYS = 365;

// src/core/policy/safety-level.ts
var SAFETY_LEVEL_CAPABILITIES = {
  standard: { fail_closed: false, paranoid_rm: false, paranoid_interpreters: false },
  strict: { fail_closed: true, paranoid_rm: false, paranoid_interpreters: false },
  paranoid: { fail_closed: true, paranoid_rm: true, paranoid_interpreters: true }
};

// src/hosts/catalog.ts
var catalog = [
  {
    id: "antigravity-cli",
    displayName: "Antigravity CLI",
    doctorOrder: 3,
    runtime: {
      order: 1,
      flags: ["-ac", "--agy-cli"],
      description: "Run as Antigravity CLI PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 2,
      flag: "--agy-cli",
      artifactKind: "hook config",
      probeCommand: ["agy", "--version"]
    }
  },
  {
    id: "claude-code",
    displayName: "Claude Code",
    doctorOrder: 1,
    runtime: {
      order: 2,
      displayName: "Coding CLI",
      flags: ["-cc", "--coding-cli"],
      legacyFlags: ["--claude-code"],
      description: "Run as Coding CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cc", "--claude-code"]
    },
    install: {
      order: 3,
      flag: "--claude-code",
      artifactKind: "plugin",
      probeCommand: ["claude", "--version"]
    }
  },
  {
    id: "codex",
    displayName: "Codex",
    doctorOrder: 4,
    runtime: {
      order: 3,
      flags: ["-cx", "--codex"],
      description: "Run as a Codex PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 4,
      flag: "--codex",
      artifactKind: "plugin",
      probeCommand: ["codex", "--version"]
    }
  },
  {
    id: "copilot-cli",
    displayName: "GitHub Copilot CLI",
    doctorOrder: 7,
    runtime: {
      order: 6,
      flags: ["-cp", "--copilot-cli"],
      description: "Run as GitHub Copilot CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cp", "--copilot-cli"]
    },
    install: {
      order: 7,
      flag: "--copilot-cli",
      artifactKind: "plugin",
      probeCommand: ["copilot", "--binary-version"]
    }
  },
  {
    id: "gemini-cli",
    displayName: "Gemini CLI",
    doctorOrder: 6,
    runtime: {
      order: 5,
      flags: ["-gc", "--gemini-cli"],
      description: "Run as Gemini CLI BeforeTool hook",
      legacyTopLevelFlags: ["-gc", "--gemini-cli"]
    },
    install: {
      order: 6,
      flag: "--gemini-cli",
      artifactKind: "extension",
      probeCommand: ["gemini", "--version"]
    }
  },
  {
    id: "grok-build",
    displayName: "Grok Build",
    doctorOrder: 8,
    runtime: {
      order: 7,
      flags: ["-gb", "--grok-build"],
      description: "Run as Grok Build PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 8,
      flag: "--grok-build",
      artifactKind: "hook config",
      probeCommand: ["grok", "--version"]
    }
  },
  {
    id: "hermes-agent",
    displayName: "Hermes Agent",
    doctorOrder: 9,
    runtime: {
      order: 8,
      flags: ["-ha", "--hermes-agent"],
      description: "Run as Hermes Agent pre_tool_call hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 9,
      flag: "--hermes-agent",
      artifactKind: "plugin",
      probeCommand: ["hermes", "--version"]
    }
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    doctorOrder: 10,
    runtime: {
      order: 9,
      flags: ["-kc", "--kimi-code"],
      description: "Run as Kimi Code PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 10,
      flag: "--kimi-code",
      artifactKind: "hook config",
      probeCommand: ["kimi", "--version"]
    }
  },
  {
    id: "openclaw",
    displayName: "OpenClaw",
    doctorOrder: 11,
    install: {
      order: 11,
      flag: "--openclaw",
      artifactKind: "plugin",
      probeCommand: ["openclaw", "--version"]
    }
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    doctorOrder: 12,
    install: {
      order: 12,
      flag: "--opencode",
      artifactKind: "plugin",
      probeCommand: ["opencode", "--version"]
    }
  },
  {
    id: "pi",
    displayName: "Pi",
    doctorOrder: 13,
    install: {
      order: 13,
      flag: "--pi",
      artifactKind: "package",
      probeCommand: ["pi", "--version"]
    }
  },
  {
    id: "cursor",
    displayName: "Cursor",
    doctorOrder: 5,
    runtime: {
      order: 4,
      flags: ["-cu", "--cursor"],
      description: "Run as Cursor preToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 5,
      flag: "--cursor",
      artifactKind: "hook config",
      probeCommand: ["cursor", "--version"]
    }
  },
  {
    id: "amp",
    displayName: "Amp Code",
    doctorOrder: 2,
    install: {
      order: 1,
      flag: "--amp",
      artifactKind: "plugin",
      probeCommand: ["amp", "--version"]
    }
  }
];
var doctorIntegrationOrder = catalog.slice().sort((a, b) => a.doctorOrder - b.doctorOrder).map((integration) => integration.id);
var runtimeHookIntegrationMetadata = catalog.filter((integration) => ("runtime" in integration)).slice().sort((a, b) => a.runtime.order - b.runtime.order).map((integration) => ({
  id: integration.id,
  displayName: "displayName" in integration.runtime ? integration.runtime.displayName : integration.displayName,
  flags: integration.runtime.flags,
  legacyFlags: "legacyFlags" in integration.runtime ? integration.runtime.legacyFlags : [],
  description: integration.runtime.description,
  legacyTopLevelFlags: integration.runtime.legacyTopLevelFlags
}));
var installIntegrationMetadata = catalog.slice().sort((a, b) => a.install.order - b.install.order).map((integration) => ({ id: integration.id, ...integration.install })).map(({ order: _, ...integration }) => integration);
var integrationDisplayNames = Object.fromEntries(catalog.map((integration) => [integration.id, integration.displayName]));

// src/gui/frontend/main.ts
var token = JSON.parse(document.getElementById("ccsn-data").textContent).token;
var fallbackRepoUrl = "https://github.com/kenryu42/cc-safety-net";
var safetyLevels = {
  standard: [
    "Standard",
    "Blocks recognizable destructive commands and sensitive content access while allowing metadata-only sensitive-path checks. Recommended for normal coding."
  ],
  strict: [
    "Strict",
    "Standard, plus blocks dynamic or unparseable commands and metadata-only sensitive-path discovery. Occasional false positives on advanced shell."
  ],
  paranoid: [
    "Paranoid",
    "Strict, plus blocks rm -rf inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos."
  ]
};
var safetyOverrides = {
  fail_closed: ["Fail closed", "Block commands the parser cannot fully understand."],
  paranoid_rm: ["Paranoid rm -rf checks", "Block non-temp rm -rf inside the project."],
  paranoid_interpreters: ["Paranoid interpreters", "Block interpreter one-liners."]
};
var rawCopyIcons = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>'
};
var starIcons = {
  outline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
  filled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>'
};
var reportIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><path d="M4 22v-7"></path></svg>';
var pathListIcons = {
  add: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M10 11v6M14 11v6"></path></svg>'
};
var state;
var draftPolicy;
var projectDraft = null;
var markedFields = new Set;
var preview;
var previewRequestId = 0;
var dirty = false;
var searchActive = false;
var OVERVIEW_DAYS = 7;
var overview = null;
var activity = null;
var knownRuleIds = new Set;
var activityFilters = { days: 7, decision: "all", agent: "all", query: "", command: "" };
var tierExpanded = new Map([
  ["enforced", false],
  ["normal", false],
  ["strict", false],
  ["paranoid", false]
]);
var searchCollapsedTiers = new Set;
var secretGroupExpanded = new Map;
var searchCollapsedSecretGroups = new Set;
var rawCopyResetTimer = null;
var feedCopyResetTimer = null;
var activityQueryTimer;
var renderedFeedEntries = [];
var suspects = new Set;
var activeStarContext = { starred: null, starCount: null, blockedTotal: 0 };
var integrations = null;
var integrationBusy = new Set;
var rulesData = null;
var rulesRequested = false;
var rulesScope = "project";
var pendingRuleFocus = null;
var directoryPickerFailed = false;
var api = (path, init = {}) => fetch(\`\${path}\${path.includes("?") ? "&" : "?"}token=\${encodeURIComponent(token)}\`, {
  ...init,
  headers: {
    "content-type": "application/json",
    "x-cc-safety-net-token": token,
    ...init.headers || {}
  }
});
var requestJson = async (path, init) => {
  try {
    const response = await api(path, init);
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      data: text ? JSON.parse(text) : {},
      error: undefined
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: undefined,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var errorText = (result) => result.error ?? (Array.isArray(result.data?.errors) && result.data.errors.length ? result.data.errors.join(\`
\`) : null) ?? result.data?.error ?? \`Request failed (status \${result.status}).\`;
var isWriteSuccess = (result) => result.ok && !(Array.isArray(result.data?.errors) && result.data.errors.length > 0);
var qs = (id) => document.getElementById(id);
var setDetailStatus = (text, kind = "") => {
  qs("status").textContent = text;
  qs("status").className = \`status \${kind}\`;
};
var appStatusTimer;
var setAppStatus = (text, kind = "") => {
  qs("app-status").textContent = text;
  qs("app-status").className = \`app-status \${kind}\`;
  clearTimeout(appStatusTimer);
  if (kind === "ok")
    appStatusTimer = setTimeout(() => setAppStatus(""), 4000);
};
var busy = false;
var updateActions = () => {
  const hasErrors = (state?.errors.length ?? 0) > 0;
  qs("save").disabled = busy || !state || hasErrors;
  qs("reset").disabled = busy || !state;
  qs("repair").disabled = busy || !hasErrors;
};
var runExclusive = async (pendingText, fn) => {
  if (busy)
    return;
  busy = true;
  updateActions();
  setAppStatus(pendingText);
  setDetailStatus("");
  try {
    await fn();
  } finally {
    busy = false;
    updateActions();
  }
};
var checkbox = (checked) => checked ? "checked" : "";
var dayCount = (days) => \`\${days} day\${days === 1 ? "" : "s"}\`;
var syncMasterBadges = () => {
  document.querySelectorAll("label.row.master input").forEach((input) => {
    const badge = input.closest("label")?.querySelector(".master-badge");
    if (badge)
      badge.textContent = input.checked ? "On" : "Off";
  });
};
var escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char] ?? char);
var clonePolicy = (policy) => JSON.parse(JSON.stringify(policy));
var pathLines = (value) => value.split(\`
\`).map((line) => line.trim()).filter(Boolean);
var formatPolicy = (policy) => \`\${JSON.stringify(policy, null, 2)}
\`;
var markedOverrides = (marked, section, overrides) => Object.fromEntries(Object.entries(overrides).filter(([key, value]) => value !== undefined && marked.has(\`\${section}.overrides.\${key}\`)));
var withOverrides = (overrides) => Object.keys(overrides).length > 0 ? { overrides } : {};
var collectProjectProposal = (marked, policy) => {
  const sections = {
    safety: {
      ...marked.has("safety.level") ? { level: policy.safety.level } : {},
      ...withOverrides(markedOverrides(marked, "safety", policy.safety.overrides))
    },
    workflow: marked.has("workflow.worktree_mode") ? { worktree_mode: policy.workflow.worktree_mode } : {},
    destructive_command_protection: {
      ...marked.has("destructive_command_protection.enabled") ? { enabled: policy.destructive_command_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "destructive_command_protection", policy.destructive_command_protection.overrides)),
      ...marked.has("destructive_command_protection.allow_paths") ? { allow_paths: policy.destructive_command_protection.allow_paths } : {}
    },
    secret_protection: {
      ...marked.has("secret_protection.enabled") ? { enabled: policy.secret_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "secret_protection", policy.secret_protection.overrides)),
      ...marked.has("secret_protection.deny_paths") ? { deny_paths: policy.secret_protection.deny_paths } : {},
      ...marked.has("secret_protection.allow_paths") ? { allow_paths: policy.secret_protection.allow_paths } : {}
    }
  };
  return {
    version: 1,
    ...Object.fromEntries(Object.entries(sections).filter(([, fields]) => Object.keys(fields).length > 0))
  };
};
var projectMarkedFields = (projection) => {
  const destructive = projection.destructive_command_protection ?? {};
  const secret = projection.secret_protection ?? {};
  return [
    ...projection.safety?.level === undefined ? [] : ["safety.level"],
    ...Object.keys(projection.safety?.overrides ?? {}).map((key) => \`safety.overrides.\${key}\`),
    ...projection.workflow?.worktree_mode === undefined ? [] : ["workflow.worktree_mode"],
    ...destructive.enabled === undefined ? [] : ["destructive_command_protection.enabled"],
    ...Object.keys(destructive.overrides ?? {}).map((id) => \`destructive_command_protection.overrides.\${id}\`),
    ...destructive.allow_paths === undefined ? [] : ["destructive_command_protection.allow_paths"],
    ...secret.enabled === undefined ? [] : ["secret_protection.enabled"],
    ...Object.keys(secret.overrides ?? {}).map((id) => \`secret_protection.overrides.\${id}\`),
    ...secret.deny_paths === undefined ? [] : ["secret_protection.deny_paths"],
    ...secret.allow_paths === undefined ? [] : ["secret_protection.allow_paths"]
  ];
};
var overlayProjectProposal = (baseline, proposal) => {
  const displayed = clonePolicy(baseline);
  const destructive = proposal.destructive_command_protection ?? {};
  const secret = proposal.secret_protection ?? {};
  if (proposal.safety?.level)
    displayed.safety.level = proposal.safety.level;
  Object.assign(displayed.safety.overrides, proposal.safety?.overrides ?? {});
  if (proposal.workflow?.worktree_mode !== undefined)
    displayed.workflow.worktree_mode = proposal.workflow.worktree_mode;
  if (destructive.enabled !== undefined)
    displayed.destructive_command_protection.enabled = destructive.enabled;
  Object.assign(displayed.destructive_command_protection.overrides, destructive.overrides ?? {});
  if (destructive.allow_paths)
    displayed.destructive_command_protection.allow_paths = destructive.allow_paths;
  if (secret.enabled !== undefined)
    displayed.secret_protection.enabled = secret.enabled;
  Object.assign(displayed.secret_protection.overrides, secret.overrides ?? {});
  if (secret.deny_paths)
    displayed.secret_protection.deny_paths = secret.deny_paths;
  if (secret.allow_paths)
    displayed.secret_protection.allow_paths = secret.allow_paths;
  return displayed;
};
var seedProjectDraft = (data) => {
  if (!data.baseline)
    return null;
  if (!Array.isArray(data.userPolicyDiagnostics) || data.userPolicyDiagnostics.length > 0)
    return null;
  const marked = new Set(projectMarkedFields(data.projection ?? {}));
  const policy = overlayProjectProposal(data.baseline, data.projection ?? {});
  return {
    baseline: data.baseline,
    marked,
    policy,
    snapshot: JSON.stringify(collectProjectProposal(marked, policy))
  };
};
var collectFormPolicy = () => ({
  version: 1,
  safety: {
    level: draftPolicy.safety.level,
    overrides: Object.fromEntries(Object.entries(draftPolicy.safety.overrides).filter(([, value]) => typeof value === "boolean"))
  },
  workflow: draftPolicy.workflow,
  destructive_command_protection: draftPolicy.destructive_command_protection,
  secret_protection: {
    enabled: draftPolicy.secret_protection.enabled,
    overrides: draftPolicy.secret_protection.overrides,
    deny_paths: draftPolicy.secret_protection.deny_paths,
    allow_paths: draftPolicy.secret_protection.allow_paths
  },
  audit: draftPolicy.audit
});
var effectivePreviewPolicy = (policy, baseline) => {
  if (!baseline)
    return policy;
  const union = (user, project) => [...new Set([...user, ...project])];
  return {
    ...policy,
    destructive_command_protection: {
      ...policy.destructive_command_protection,
      allow_paths: union(baseline.destructive_command_protection.allow_paths, policy.destructive_command_protection.allow_paths)
    },
    secret_protection: {
      ...policy.secret_protection,
      deny_paths: union(baseline.secret_protection.deny_paths, policy.secret_protection.deny_paths),
      allow_paths: union(baseline.secret_protection.allow_paths, policy.secret_protection.allow_paths)
    }
  };
};
var requestPolicyPreview = (policy = collectFormPolicy()) => requestJson("/api/policy/preview", {
  method: "POST",
  body: JSON.stringify(policy)
});
var policyScopeMode = () => projectDraft ? "project" : "user";
var projectFieldChip = (field, compact = false) => {
  if (policyScopeMode() !== "project")
    return "";
  if (!markedFields.has(field))
    return '<span class="project-chip inherited">Inherited</span>';
  return \`<button type="button" class="project-chip" data-unmark-field="\${escapeHtml(field)}" title="Set by project - click to inherit again" aria-label="Set by project: \${escapeHtml(field)}. Activate to inherit again.">\${compact ? "Project" : "Set by project"}</button>\`;
};
var projectFieldLine = (field) => {
  const chip = projectFieldChip(field);
  return chip ? \`<div class="project-field-line">\${chip}</div>\` : "";
};
var projectChipSlots = [
  ["destructive-enabled-chip", "destructive_command_protection.enabled"],
  ["secret-enabled-chip", "secret_protection.enabled"],
  ["allow-paths-chip", "destructive_command_protection.allow_paths"],
  ["deny-paths-chip", "secret_protection.deny_paths"],
  ["secret-allow-paths-chip", "secret_protection.allow_paths"]
];
var syncProjectChips = () => {
  projectChipSlots.forEach(([id, field]) => {
    qs(id).innerHTML = projectFieldChip(field);
  });
};
var markProjectField = (field) => {
  if (!projectDraft || markedFields.has(field))
    return;
  markedFields.add(field);
  renderSafety();
  syncProjectChips();
};
var rebuildProjectDisplay = () => {
  if (!projectDraft)
    return;
  draftPolicy = overlayProjectProposal(projectDraft.baseline, collectProjectProposal(markedFields, draftPolicy));
  renderPolicySections();
  refreshPolicyPreview();
};
var unmarkProjectField = (field) => {
  if (!projectDraft || !markedFields.has(field))
    return;
  markedFields.delete(field);
  rebuildProjectDisplay();
};
var viewNames = ["overview", "activity", "policy", "rules", "integrations", "settings"];
var viewTitles = {
  overview: "Overview",
  activity: "Activity",
  policy: "Policy",
  rules: "Rules",
  integrations: "Integrations",
  settings: "Settings"
};
var currentView = () => {
  const hash = location.hash.replace("#", "");
  return viewNames.includes(hash) ? hash : "overview";
};
var applyView = () => {
  const view = currentView();
  document.body.dataset.view = view;
  const hasSearch = view === "activity" || view === "policy";
  qs("topbar-title").textContent = viewTitles[view];
  qs("topbar-title").classList.toggle("sr-only", hasSearch);
  document.querySelectorAll(".topbar-search").forEach((el) => {
    el.hidden = el.dataset.searchView !== view;
  });
  qs("topbar").classList.toggle("has-search", hasSearch);
  document.title = \`\${viewTitles[view]} · CC Safety Net\`;
  document.querySelectorAll("[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === view)
      link.setAttribute("aria-current", "page");
    else
      link.removeAttribute("aria-current");
  });
  qs("dirty-chip").hidden = !dirty || view === "policy";
  if (view === "activity")
    applyFeedClamps(qs("activity-feed"));
  if (view === "rules" && !rulesRequested) {
    rulesRequested = true;
    loadRules();
  }
  if (view === "rules" && rulesData && pendingRuleFocus)
    renderRules();
};
var agentLabels = integrationDisplayNames;
var tierCountHtml = (segments) => {
  const parts = segments.filter(([count]) => count > 0).map(([count, label, tone]) => tone ? \`<span class="count-\${tone}">\${count} \${label}</span>\` : \`\${count} \${label}\`);
  return parts.length > 0 ? parts.join(" · ") : "0 on";
};
var feedItemHtml = (entry, index) => {
  const deny = entry.decision !== "allow";
  const badgeClass = entry.failureStage ? "error" : deny ? "deny" : "allow";
  const badgeLabel = entry.failureStage ? "Error" : deny ? "Blocked" : "Allowed";
  return \`<article class="feed-item">
    <div class="feed-meta">
      <span class="decision-badge \${badgeClass}">\${badgeLabel}</span>
      \${entry.agent && entry.agent !== "unknown" ? \`<span class="agent-badge">\${escapeHtml(agentLabels[entry.agent] ?? entry.agent)}</span>\` : ""}
      \${entry.ruleId ? knownRuleIds.has(entry.ruleId) ? \`<button type="button" class="rule-id" data-jump-rule="\${escapeHtml(entry.ruleId)}" title="Show this rule in Policy">\${escapeHtml(entry.ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(entry.ruleId)}</code>\` : ""}
      <time datetime="\${escapeHtml(entry.ts)}" title="\${escapeHtml(entry.ts)}">\${formatRelativeTime(entry.ts)}</time>
      <button type="button" class="icon-button feed-copy" data-log-copy="\${index}" aria-label="Copy log entry as JSON">\${rawCopyIcons.copy}</button>
      \${deny ? \`<button type="button" class="icon-button feed-report" data-report-fp="\${index}" aria-label="Report false positive" title="Report false positive">\${reportIcon}</button>\` : \`<button type="button" class="feed-toggle feed-block" data-block-future="\${index}">Block this in future</button>\`}
    </div>
    <code class="feed-command">\${escapeHtml(entry.segment || entry.command || "(no command recorded)")}</code>
    \${entry.reason && entry.reason !== "allowed" ? \`<p class="feed-reason muted">\${escapeHtml(entry.reason)}</p>\` : ""}
  </article>\`;
};
var applyFeedClamps = (root) => {
  const overflowing = [...root.querySelectorAll(".feed-command")].filter((command) => !command.classList.contains("clamped") && command.scrollHeight > command.clientHeight + 1);
  overflowing.forEach((command) => {
    command.classList.add("clamped");
    command.insertAdjacentHTML("afterend", '<button type="button" class="feed-toggle" data-feed-toggle aria-expanded="false">Show more</button>');
  });
};
var dayLabel = (ts) => {
  const date = new Date(ts);
  if (date.toDateString() === new Date().toDateString())
    return "Today";
  if (date.toDateString() === new Date(Date.now() - 86400000).toDateString())
    return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
var renderOverviewActivity = () => {
  if (!overview)
    return;
  const tile = (value, label, extra) => \`<div class="tile"><strong>\${escapeHtml(value.toLocaleString("en-US"))}</strong><span>\${escapeHtml(label)}</span>\${extra}</div>\`;
  const dayAgoLabel = (daysAgo) => daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : \`\${daysAgo} days ago\`;
  const sparkline = (byDay, noun) => {
    const max = Math.max(...byDay, 1);
    return \`<div class="tile-spark" role="group" aria-label="Commands \${noun} per day, most recent \${dayCount(byDay.length)}">\${byDay.map((count, index) => {
      const label = \`\${dayAgoLabel(byDay.length - 1 - index)}: \${count.toLocaleString("en-US")} \${noun}\`;
      return \`<div class="spark-col" role="img" tabindex="0" data-count="\${count.toLocaleString("en-US")}" aria-label="\${escapeHtml(label)}"><div class="spark-bar\${count === 0 ? " spark-zero" : ""}" aria-hidden="true" style="height:\${count === 0 ? 2 : Math.max(2, Math.round(count / max * 40))}px"></div></div>\`;
    }).join("")}</div>\`;
  };
  qs("overview-window").textContent = \`Last \${dayCount(overview.days)}\`;
  qs("overview-tiles").innerHTML = [
    tile(overview.counts.blocked, "Blocked", sparkline(overview.counts.blockedByDay, "blocked")),
    tile(overview.totalInWindow, "Analyzed", sparkline(overview.counts.analyzedByDay, "analyzed"))
  ].join("");
};
var retentionDays = () => state?.policy?.audit?.retention_days ?? DEFAULT_AUDIT_RETENTION_DAYS;
var overviewDays = () => Math.min(OVERVIEW_DAYS, retentionDays());
var renderRetention = (loaded) => {
  qs("retention-days").value = String(loaded.policy.audit.retention_days);
  qs("retention-unit").textContent = loaded.policy.audit.retention_days === 1 ? "day" : "days";
  qs("retention-note").textContent = "Saved on change. Lowering this deletes anything already older than the new window; the Activity tab can only look back as far as it.";
};
var activityWindowOptions = () => {
  const retained = retentionDays();
  const windows = [7, 30, 90, 180, 365].filter((days) => days < retained);
  return [...windows, retained];
};
var configStateNotice = () => {
  const configState = state?.configState;
  if (!configState || configState.state === "ready")
    return null;
  return \`A fallback configuration is being enforced: \${configState.reason}\`;
};
var setProtectionBanner = (notices) => {
  const text = notices.filter(Boolean).join(" ");
  qs("protection-banner").textContent = text;
  qs("protection-banner").hidden = text === "";
};
var renderProtectionCard = () => {
  const configNotice = configStateNotice();
  if (!state?.preview) {
    qs("protection-card").hidden = true;
    setProtectionBanner([configNotice]);
    return;
  }
  const policy = state.policy;
  const customized = state.preview.counts.effectiveCustomizations > 0 || Object.entries(policy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[policy.safety.level][key]);
  const commandsOn = policy.destructive_command_protection.enabled;
  const secretsOn = policy.secret_protection.enabled;
  const off = [
    commandsOn ? null : "Destructive command protection is off — configurable destructive command rules are not being enforced (catastrophic and custom rules remain active)",
    secretsOn ? null : "Secret protection is off — sensitive paths and deny paths are not being blocked"
  ].filter(Boolean);
  setProtectionBanner([
    off.length > 0 ? \`\${off.join(". ")}. Re-enable \${off.length > 1 ? "them" : "it"} in Policy.\` : null,
    configNotice
  ]);
  qs("protection-card").hidden = false;
  qs("protection-card").classList.toggle("protection-warning", !commandsOn || !secretsOn);
  qs("protection-card").innerHTML = \`<div class="panel-head"><div class="panel-title"><h2>Protection status</h2></div><a class="panel-head-action view-all-link" href="#policy">Configure</a></div>\` + \`<p>\${escapeHtml(safetyLevels[policy.safety.level][0])}\${customized ? " · Customized" : ""}</p>\` + \`<p\${commandsOn ? "" : ' class="state-disabled"'}>\${commandsOn ? \`\${state.preview.counts.enabled} rules active\` : "Destructive command protection is OFF"}</p>\` + \`<p\${secretsOn ? "" : ' class="state-disabled"'}>\${secretsOn ? "Secret protection on" : "Secret protection is OFF"}</p>\`;
};
var renderTopList = (containerId, counts, className, dataAttr) => {
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  qs(containerId).innerHTML = top.length === 0 ? '<p class="empty">No blocked commands in this window.</p>' : top.map(([key, count]) => \`<button type="button" class="\${className}" \${dataAttr}="\${escapeHtml(key)}"><code class="rule-id">\${escapeHtml(key)}</code><span class="chip-count">\${count.toLocaleString("en-US")}</span></button>\`).join("");
};
var renderTopLists = () => {
  if (!overview)
    return;
  renderTopList("top-commands", overview.counts.commands, "top-command", "data-command");
  renderTopList("top-rules", overview.counts.rules, "top-rule", "data-rule-id");
};
var clearCommandFilter = () => {
  if (!activityFilters.command)
    return false;
  activityFilters.command = "";
  return true;
};
var jumpToActivityRule = (ruleId) => {
  activityFilters.command = "";
  activityFilters.query = ruleId.toLowerCase();
  qs("activity-search").value = ruleId;
  if (activity) {
    renderActivityControls();
    renderActivityFeed();
  }
  location.hash = "activity";
};
var renderGuardErrors = () => {
  if (!overview)
    return;
  qs("guard-errors").hidden = overview.counts.errors === 0;
  if (overview.counts.errors === 0)
    return;
  qs("guard-errors").textContent = \`\${overview.counts.errors.toLocaleString("en-US")} guard error\${overview.counts.errors === 1 ? "" : "s"} in the last \${dayCount(overview.days)} — commands blocked because evaluation failed, not by policy. Click to view.\`;
};
var renderActivityControls = () => {
  if (!activity)
    return;
  const agentCounts = activity.counts.agents;
  const chipHtml = (kind, value, label, count) => \`<button type="button" class="chip" data-activity-chip="\${kind}" data-chip-value="\${escapeHtml(value)}" aria-pressed="\${activityFilters[kind] === value}">\${escapeHtml(label)}\${count === undefined ? "" : \` <span class="chip-count">\${count.toLocaleString("en-US")}</span>\`}</button>\`;
  qs("activity-decision").innerHTML = [
    chipHtml("decision", "all", "All", activity.totalInWindow),
    chipHtml("decision", "deny", "Blocked", activity.counts.blocked),
    chipHtml("decision", "allow", "Allowed", activity.counts.allowed),
    ...activity.counts.errors > 0 ? [chipHtml("decision", "error", "Errors", activity.counts.errors)] : [],
    ...suspects.size > 0 ? [chipHtml("decision", "suspect", "Likely false positive", suspects.size)] : []
  ].join("");
  const agentNames = Object.keys(agentCounts).filter((name) => name !== "unknown").sort();
  qs("activity-agents").innerHTML = agentNames.length < 2 ? "" : [
    chipHtml("agent", "all", "All agents"),
    ...agentNames.map((name) => chipHtml("agent", name, agentLabels[name] ?? name, agentCounts[name]))
  ].join("");
  qs("activity-command-filter").innerHTML = activityFilters.command ? \`<button type="button" class="filter-pill" data-clear-command aria-label="Clear command filter">Command: <code>\${escapeHtml(activityFilters.command)}</code><span class="filter-pill-x" aria-hidden="true">✕</span></button>\` : "";
  qs("activity-days").innerHTML = activityWindowOptions().map((days) => \`<option value="\${days}">Last \${dayCount(days)}</option>\`).join("");
  qs("activity-days").value = String(activity.days);
};
var renderActivityFeed = () => {
  if (!activity)
    return;
  const matchesFilters = (entry) => {
    if (activityFilters.decision === "deny" && entry.decision === "allow")
      return false;
    if (activityFilters.decision === "allow" && entry.decision !== "allow")
      return false;
    if (activityFilters.decision === "error" && !entry.failureStage)
      return false;
    if (activityFilters.decision === "suspect" && !suspects.has(entry))
      return false;
    if (activityFilters.agent !== "all" && (entry.agent || "unknown") !== activityFilters.agent)
      return false;
    if (activityFilters.command) {
      if (entry.decision === "allow")
        return false;
      return commandSignature(entry.segment || entry.command) === activityFilters.command;
    }
    if (!activityFilters.query)
      return true;
    return [entry.ruleId, entry.segment || entry.command].filter(Boolean).join(" ").toLowerCase().includes(activityFilters.query);
  };
  const entries = activity.entries.filter(matchesFilters);
  renderedFeedEntries = entries;
  qs("activity-feed").innerHTML = entries.length === 0 ? '<p class="empty">No audit log entries match.</p>' : \`<div class="feed-list">\${entries.map((entry, index) => {
    const label = dayLabel(entry.ts);
    const previous = entries[index - 1];
    const separator = previous && label === dayLabel(previous.ts) ? "" : \`<div class="feed-day-sep">\${escapeHtml(label)}</div>\`;
    return separator + feedItemHtml(entry, index);
  }).join("")}</div>\`;
  applyFeedClamps(qs("activity-feed"));
  qs("activity-count").textContent = \`Showing \${entries.length.toLocaleString("en-US")} of \${activity.totalInWindow.toLocaleString("en-US")} entries from the last \${dayCount(activity.days)}\${activity.truncated ? " (capped at 500, newest of each decision)" : ""}.\${activity.unreadable > 0 ? \` \${activity.unreadable.toLocaleString("en-US")} audit log source\${activity.unreadable === 1 ? "" : "s"} could not be read, so this list is incomplete.\` : ""}\`;
};
var loadOverview = async () => {
  const result = await requestJson(\`/api/activity?days=\${overviewDays()}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("overview-window").textContent = "";
    qs("overview-tiles").innerHTML = "";
    qs("top-rules").innerHTML = message;
    qs("guard-errors").hidden = true;
    return;
  }
  const feed = result.data;
  overview = feed;
  qs("logs-path").textContent = overview.logsDir ?? "Not available";
  renderOverviewActivity();
  renderTopLists();
  renderGuardErrors();
};
var loadActivity = async () => {
  const result = await requestJson(\`/api/activity?days=\${activityFilters.days}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("activity-feed").innerHTML = message;
    qs("activity-count").textContent = "";
    return;
  }
  const feed = result.data;
  activity = feed;
  suspects = findSuspectEntries(activity.entries);
  if (activityFilters.agent !== "all" && !(activityFilters.agent in activity.counts.agents)) {
    activityFilters.agent = "all";
  }
  if (activityFilters.decision === "error" && activity.counts.errors === 0) {
    activityFilters.decision = "all";
  }
  if (activityFilters.decision === "suspect" && suspects.size === 0) {
    activityFilters.decision = "all";
  }
  renderActivityControls();
  renderActivityFeed();
};
var runRefresh = async (buttonId, reload) => {
  const button = qs(buttonId);
  if (button.disabled)
    return;
  button.disabled = true;
  button.classList.add("spinning");
  try {
    await Promise.all([reload(), new Promise((resolve) => setTimeout(resolve, 600))]);
  } finally {
    button.classList.remove("spinning");
    button.disabled = false;
  }
};
var refreshActivity = () => runRefresh("activity-refresh", () => Promise.all([loadOverview(), loadActivity()]));
var renderIntegrations = () => {
  const loaded = integrations;
  if (!loaded)
    return;
  qs("integrations-list").innerHTML = loaded.targets.map((row) => {
    const busy = integrationBusy.has(row.target);
    const version = row.version === null ? '<span class="muted">not detected</span>' : \`<span class="agent-badge">v\${escapeHtml(row.version)}</span>\`;
    const status = row.status === "active" ? '<span class="state-active">Installed</span>' : row.status === "disabled" ? '<span class="state-disabled">Disabled</span>' : row.status === "not-inspected" ? \`<span class="muted" title="This runtime's state file could not be read, so its status is unknown.">Not inspected</span>\` : '<span class="muted">Not installed</span>';
    const uninstall = row.status === "active";
    const busyLabel = uninstall ? "Uninstalling…" : "Installing…";
    const action = row.version === null ? "" : \`<button type="button" class="\${uninstall ? "danger" : "primary"}" data-integration-action="\${uninstall ? "uninstall" : "install"}" data-integration-target="\${escapeHtml(row.target)}"\${busy ? " disabled" : ""}>\${busy ? busyLabel : uninstall ? "Uninstall" : row.status === "disabled" ? "Enable" : "Install"}</button>\`;
    const note = row.note ? \`<div class="status \${row.note.kind}">\${escapeHtml(row.note.text)}</div>\` : "";
    return \`<div class="integration-row">
        <span class="integration-info"><strong>\${escapeHtml(row.label)}</strong> \${version} \${status}</span>
        \${action}
        \${note}
      </div>\`;
  }).join("");
};
var renderHealthStrip = (health) => {
  const loaded = integrations;
  if (!loaded || !health.ok)
    return;
  const detected = loaded.targets.filter((row) => row.status === "active" || row.status === "disabled");
  const active = detected.filter((row) => row.status === "active");
  const inactive = detected.filter((row) => row.status === "disabled");
  const attention = inactive.length > 0 || active.length === 0;
  const parts = [];
  const labelHtml = (row) => \`<strong>\${escapeHtml(row.label)}</strong>\`;
  if (active.length)
    parts.push(\`Hook active in \${active.map(labelHtml).join(", ")}\`);
  if (inactive.length)
    parts.push(\`\${inactive.map(labelHtml).join(", ")} detected without an active hook\`);
  if (!parts.length)
    parts.push("No agent hooks detected");
  if (health.data?.update?.updateAvailable)
    parts.push(\`v\${escapeHtml(health.data.update.latestVersion)} available\`);
  const link = attention ? ' <a class="view-all-link" href="#integrations">Fix in Integrations</a>' : "";
  const el = qs("health-strip");
  el.className = attention ? "status health-strip error" : "status health-strip ok";
  el.innerHTML = parts.join(" · ") + link;
  el.hidden = false;
};
var loadIntegrations = async () => {
  const result = await requestJson("/api/integrations");
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs("integrations-list").innerHTML = \`<p class="empty">Could not load integrations: \${escapeHtml(errorText(result))}</p>\`;
    return;
  }
  integrations = result.data;
  renderIntegrations();
  qs("integrations-pkg-version").textContent = result.data.system.version;
  qs("integrations-node-version").textContent = result.data.system.nodeVersion ?? "unknown";
  qs("integrations-platform").textContent = result.data.system.platform;
  qs("integrations-system").hidden = false;
};
var refreshIntegrations = () => runRefresh("integrations-refresh", loadIntegrations);
var renderRules = () => {
  const loaded = rulesData;
  if (!loaded)
    return;
  if (!qs("rules-project-path").value)
    qs("rules-project-path").value = loaded.projectPath;
  const canPick = loaded.canPickDirectory && !directoryPickerFailed;
  qs("rules-project-path").readOnly = canPick;
  qs("rules-choose-directory").hidden = !canPick;
  qs("rules-list").innerHTML = loaded.rulebooks.length === 0 ? loaded.errors.length > 0 ? '<p class="empty">Every configured rulebook was dropped, so no custom rule is enforced. See Diagnostics below.</p>' : '<p class="empty">No custom rulebooks. Run <code>npx -y cc-safety-net rule init</code> to create one, or see the <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">documentation</a>.</p>' : loaded.rulebooks.map((rulebook) => \`<div class="rulebook-card">
    <div class="rulebook-head">
      <strong>\${escapeHtml(rulebook.name)}</strong>
      <span class="agent-badge">v\${escapeHtml(rulebook.version)}</span>
      \${rulebook.spec === rulebook.name ? "" : \`<code>\${escapeHtml(rulebook.spec)}</code>\`}
      <span>\${rulebook.source === "user" ? "All projects" : "This project"}</span>
      <span>\${rulebook.rules.length} rule\${rulebook.rules.length === 1 ? "" : "s"}</span>
    </div>
    \${rulebook.rules.map((rule) => \`<div class="rulebook-rule\${pendingRuleFocus === rule.name ? " rules-focus" : ""}">
      <code class="rule-id">custom.\${escapeHtml(rule.name)}</code>
      <code>\${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(" "))}</code>
      <p>Blocked arguments (any one matches): \${rule.block_args.map((arg) => \`<code>\${escapeHtml(arg)}</code>\`).join(" ")}</p>
      <p>\${escapeHtml(rule.reason)}</p>
    </div>\`).join("")}
  </div>\`).join("");
  const diagnostics = [
    ...loaded.errors.map((text) => \`<div class="status error">\${escapeHtml(text)}</div>\`),
    ...loaded.warnings.map((text) => \`<div class="status">\${escapeHtml(text)}</div>\`)
  ];
  qs("rules-diagnostics").innerHTML = diagnostics.join("");
  qs("rules-diagnostics-panel").hidden = diagnostics.length === 0;
  if (!pendingRuleFocus)
    return;
  const focused = qs("rules-list").querySelector(".rules-focus");
  if (focused)
    focused.scrollIntoView({ block: "center" });
  if (!focused)
    setAppStatus(\`custom.\${pendingRuleFocus} is not in any rulebook\`, "error");
  pendingRuleFocus = null;
};
var loadRules = async () => {
  const result = await requestJson("/api/rules");
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs("rules-list").innerHTML = \`<p class="empty">Could not load rules: \${escapeHtml(errorText(result))}</p>\`;
    rulesData = null;
    qs("rules-diagnostics-panel").hidden = true;
    rulesRequested = false;
    return;
  }
  rulesData = result.data;
  renderRules();
};
var refreshRules = () => runRefresh("rules-refresh", () => {
  rulesRequested = true;
  return loadRules();
});
var jumpToRulesRule = (ruleId) => {
  pendingRuleFocus = ruleId.replace(/^custom\\./, "");
  location.hash = "rules";
};
var openRuleComposer = (command) => {
  qs("rules-composer-input").value = command;
  location.hash = "rules";
};
var setRulesScope = (scope) => {
  rulesScope = scope;
  document.querySelectorAll("[data-rules-scope]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.rulesScope === scope));
  });
  qs("rules-project-path-field").hidden = scope !== "project";
};
var rulePromptText = () => {
  const names = rulesData?.rulebooks.map((rulebook) => rulebook.name) ?? [];
  return [
    "Use the cc-safety-net skill for this request.",
    "If that skill is not available, run \`npx -y cc-safety-net rule doc\` first and treat its output as the source of truth for schema, paths, and validation.",
    "",
    rulesScope === "project" ? \`Scope: this project - \${qs("rules-project-path").value.trim()}\` : "Scope: all projects (user scope)",
    \`Existing rulebooks (names must stay unique across both scopes): \${names.length > 0 ? names.join(", ") : "none"}\`,
    "",
    qs("rules-composer-input").value.trim()
  ].join(\`
\`);
};
var chooseProjectDirectory = async () => {
  const button = qs("rules-choose-directory");
  if (button.disabled)
    return;
  button.disabled = true;
  const result = await requestJson("/api/rules/choose-directory", { method: "POST" });
  button.disabled = false;
  if (result.ok && result.data.path) {
    qs("rules-project-path").value = result.data.path;
    return;
  }
  if (result.ok && result.data.cancelled)
    return;
  directoryPickerFailed = true;
  qs("rules-project-path").readOnly = false;
  button.hidden = true;
  setAppStatus(\`\${result.ok ? result.data.error : errorText(result)} - type the project path instead\`, "error");
};
var copyRulePrompt = async () => {
  if (!rulesData) {
    setAppStatus("Rules have not loaded yet - refresh the Rulebooks panel", "error");
    return;
  }
  if (!qs("rules-composer-input").value.trim()) {
    setAppStatus("Describe what you want first", "error");
    return;
  }
  if (rulesScope === "project" && !qs("rules-project-path").value.trim()) {
    setAppStatus("Enter the project path the rule belongs to", "error");
    return;
  }
  qs("rules-copy-prompt").disabled = true;
  try {
    await navigator.clipboard.writeText(rulePromptText());
    qs("rules-composer-input").value = "";
    setAppStatus("Prompt copied - paste it into your coding CLI", "ok");
  } catch {
    setAppStatus("Copy failed", "error");
  } finally {
    qs("rules-copy-prompt").disabled = false;
  }
};
var runIntegrationAction = async (button) => {
  const target = button.dataset.integrationTarget;
  if (!target || integrationBusy.has(target))
    return;
  integrationBusy.add(target);
  const action = button.dataset.integrationAction;
  renderIntegrations();
  const result = await requestJson(\`/api/\${action}\`, {
    method: "POST",
    body: JSON.stringify({ target })
  });
  integrationBusy.delete(target);
  const row = integrations?.targets.find((entry) => entry.target === target);
  if (!row)
    return;
  const ok = result.ok && result.data.ok === true;
  if (ok)
    row.status = action === "install" ? "active" : "not-installed";
  row.note = {
    kind: ok ? "ok" : "error",
    text: ok ? result.data.output : result.data?.output || errorText(result)
  };
  if (!ok)
    setAppStatus(action === "install" ? "Install failed" : "Uninstall failed", "error");
  renderIntegrations();
};
var confirmDialog = (() => {
  const dialog = qs("confirm-dialog");
  const confirm = qs("confirm-dialog-confirm");
  const cancel = qs("confirm-dialog-cancel");
  let resolvePending = null;
  dialog.addEventListener("close", () => {
    if (!resolvePending)
      return;
    resolvePending(dialog.returnValue === "confirm");
    resolvePending = null;
  });
  dialog.addEventListener("cancel", () => {
    dialog.returnValue = "cancel";
  });
  return (options) => new Promise((resolve) => {
    if (resolvePending) {
      resolve(false);
      return;
    }
    qs("confirm-dialog-title").textContent = options.title;
    qs("confirm-dialog-body").textContent = options.body;
    qs("confirm-dialog-detail").textContent = options.detail ?? "";
    const detailRow = qs("confirm-dialog-detail").parentElement;
    if (detailRow)
      detailRow.hidden = !options.detail;
    qs("confirm-dialog-rows").innerHTML = options.rowsHtml ?? "";
    qs("confirm-dialog-rows").hidden = !options.rowsHtml;
    confirm.textContent = options.confirmLabel;
    confirm.className = options.confirmClass ?? "danger";
    dialog.returnValue = "cancel";
    resolvePending = resolve;
    dialog.showModal();
    cancel.focus();
  });
})();
var confirmProtectionDisable = (options) => confirmDialog({
  title: options.title,
  body: options.body,
  detail: options.detail,
  confirmLabel: "Disable protection"
});
var togglePanel = (button) => {
  const controls = button.getAttribute("aria-controls");
  if (!controls)
    return;
  const expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(expanded));
  qs(controls).hidden = !expanded;
};
var syncSearchState = () => {
  const active = qs("policy-search").value.trim().length > 0;
  if (active === searchActive)
    return;
  searchActive = active;
  if (active)
    return;
  searchCollapsedTiers.clear();
  searchCollapsedSecretGroups.clear();
};
var updateRawSource = () => {
  if (projectDraft) {
    qs("raw-source").textContent = \`Only the fields marked for this project. Writes to \${projectDraft.path}.\`;
    return;
  }
  qs("raw-source").textContent = state?.errors.length ? "Read-only original policy JSON. Repair preserves valid settings and writes canonical JSON." : "Read-only mirror of the controls.";
};
var setRawCopyCopied = (copied) => {
  qs("raw-copy").innerHTML = copied ? rawCopyIcons.check : rawCopyIcons.copy;
  qs("raw-copy").classList.toggle("copied", copied);
  qs("raw-copy").setAttribute("aria-label", copied ? "Copied raw JSON" : "Copy raw JSON to clipboard");
};
var resetFeedCopy = () => {
  document.querySelectorAll(".feed-copy.copied").forEach((button) => {
    button.classList.remove("copied");
    button.innerHTML = rawCopyIcons.copy;
    button.setAttribute("aria-label", "Copy log entry as JSON");
  });
};
var reportIssueUrl = "https://github.com/kenryu42/cc-safety-net/issues/new?template=false_positive.yml";
var reportUrlLimit = 8000;
var endsAtPathBoundary = (following) => following === "" || /^[/\\\\\\s'"]/.test(following);
var scrubReportPaths = (text, cwd, home) => [
  [cwd, "<project>"],
  [home, "~"]
].reduce((scrubbed, [from, to]) => from ? scrubbed.split(from).reduce((joined, part) => joined + (endsAtPathBoundary(part) ? to : from) + part) : scrubbed, text);
var buildReportUrl = (fields) => {
  const url = new URL(reportIssueUrl);
  Object.entries(fields).filter(([, value]) => value).forEach(([field, value]) => {
    url.searchParams.set(field, value);
  });
  return url.toString();
};
var buildReportRequest = (fields, dropped = []) => {
  const url = buildReportUrl(fields);
  if (url.length <= reportUrlLimit)
    return { url, dropped };
  const largest = Object.entries(fields).filter(([, value]) => value).sort((left, right) => right[1].length - left[1].length)[0];
  if (!largest)
    return { url, dropped };
  return buildReportRequest({ ...fields, [largest[0]]: "" }, [...dropped, largest[0]]);
};
var openReportDialog = (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.reportFp)];
  if (!entry)
    return;
  const scrub = (text) => scrubReportPaths(text, entry.cwd, activity?.homeDir);
  qs("report-command").value = scrub(entry.command || entry.segment || "");
  qs("report-entry").value = JSON.stringify(entry, (_key, value) => typeof value === "string" ? scrub(value) : value, 2);
  qs("report-dialog").returnValue = "cancel";
  qs("report-dialog").showModal();
};
var openFalsePositiveForm = async () => {
  const fields = {
    command: qs("report-command").value,
    entry: qs("report-entry").value
  };
  const request = buildReportRequest(fields);
  const copying = request.dropped.length ? navigator.clipboard.writeText(request.dropped.map((field) => \`### \${field}
\${fields[field]}\`).join(\`

\`)) : null;
  window.open(request.url, "_blank", "noopener");
  if (!copying)
    return;
  const names = request.dropped.join(" and ");
  setAppStatus(await copying.then(() => true).catch(() => false) ? \`Report too long to prefill — \${names} copied to your clipboard. Paste into the form on GitHub.\` : \`Report too long to prefill — \${names} left out. Copy the entry from the feed and paste it into the form on GitHub.\`, "error");
};
qs("report-dialog").addEventListener("close", () => {
  if (qs("report-dialog").returnValue === "report")
    openFalsePositiveForm();
});
var copyFeedEntry = async (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.logCopy)];
  if (!entry)
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
    if (feedCopyResetTimer)
      clearTimeout(feedCopyResetTimer);
    resetFeedCopy();
    button.classList.add("copied");
    button.innerHTML = rawCopyIcons.check;
    button.setAttribute("aria-label", "Copied log entry");
    feedCopyResetTimer = setTimeout(resetFeedCopy, 2000);
  } catch {
    setAppStatus("Copy failed", "error");
  }
};
var copyRawToClipboard = async () => {
  qs("raw-copy").disabled = true;
  try {
    await navigator.clipboard.writeText(qs("raw").value);
    setRawCopyCopied(true);
    if (rawCopyResetTimer)
      clearTimeout(rawCopyResetTimer);
    rawCopyResetTimer = setTimeout(() => setRawCopyCopied(false), 2000);
  } catch (error) {
    setAppStatus("Copy failed", "error");
    setDetailStatus(\`Error: Could not copy Raw JSON: \${error instanceof Error ? error.message : String(error)}\`, "error");
  } finally {
    qs("raw-copy").disabled = false;
  }
};
var formatStarCount = (count) => {
  if (typeof count !== "number")
    return "";
  if (count >= 1000)
    return \`\${(count / 1000).toFixed(1).replace(/\\.0$/, "")}k\`;
  return String(count);
};
var starCountHtml = (count) => {
  const formatted = formatStarCount(count);
  return formatted ? \`<span class="star-count">\${escapeHtml(formatted)}</span>\` : "";
};
var hideStarCta = () => {
  qs("star-row").hidden = true;
  qs("star-slot").innerHTML = "";
};
var renderStarPitch = (context, starred = false) => {
  const evidence = context.blockedTotal > 0 ? \`CC Safety Net has blocked <strong>\${escapeHtml(context.blockedTotal.toLocaleString("en-US"))}</strong> risky command\${context.blockedTotal === 1 ? "" : "s"} on this machine in its retained \${escapeHtml(dayCount(retentionDays()))} history.\` : "";
  if (starred) {
    qs("star-pitch-text").innerHTML = evidence;
    return;
  }
  qs("star-pitch-text").innerHTML = evidence ? \`\${evidence} If it saved your work, star it on GitHub.\` : "If CC Safety Net is useful to you, star it on GitHub.";
};
var renderStarLink = (context, href = fallbackRepoUrl) => {
  qs("star-slot").innerHTML = \`<a class="star-cta" href="\${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="Star CC Safety Net on GitHub (opens github.com)">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </a>\`;
  qs("star-row").hidden = false;
};
var renderStarCta = (context) => {
  activeStarContext = context;
  if (context.starred === true) {
    hideStarCta();
    return;
  }
  renderStarPitch(context);
  qs("star-mechanism").hidden = context.starred !== false;
  if (context.starred === null) {
    renderStarLink(context);
    return;
  }
  qs("star-slot").innerHTML = \`<button type="button" class="star-cta" aria-label="Star CC Safety Net on GitHub. One click via your GitHub CLI.">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </button>\`;
  qs("star-row").hidden = false;
};
var starRepo = async (button) => {
  button.disabled = true;
  const result = await requestJson("/api/star", { method: "POST" });
  if (result.ok && result.data?.ok === true) {
    const icon = button.querySelector(".star-icon");
    const label = button.querySelector(".star-label");
    if (icon)
      icon.innerHTML = starIcons.filled;
    if (label)
      label.textContent = "Starred. Thank you.";
    button.setAttribute("aria-label", "CC Safety Net starred on GitHub");
    button.classList.add("starred");
    qs("star-mechanism").hidden = true;
    renderStarPitch(activeStarContext, true);
    setAppStatus("Starred on GitHub", "ok");
    setDetailStatus("");
    return;
  }
  qs("star-mechanism").hidden = true;
  renderStarLink(activeStarContext, result.data?.fallbackUrl ?? fallbackRepoUrl);
};
var loadStarContext = async () => {
  const result = await requestJson("/api/star/context");
  renderStarCta(result.ok && result.data ? result.data : { starred: null, starCount: null, blockedTotal: 0 });
};
var syncRawFromForm = () => {
  if (state?.errors.length)
    return;
  qs("raw").value = formatPolicy(projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy());
  updateRawSource();
};
var updateDirtyStatus = () => {
  if (!state || state.errors.length)
    return;
  if (projectDraft) {
    dirty = JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== projectDraft.snapshot;
    qs("policy-savebar").hidden = !dirty;
    qs("dirty-chip").hidden = !dirty || currentView() === "policy";
    setDetailStatus("");
    updateActions();
    return;
  }
  const draftJson = JSON.stringify(collectFormPolicy());
  dirty = draftJson !== JSON.stringify(state.policy);
  qs("policy-savebar").hidden = !dirty;
  qs("dirty-chip").hidden = !dirty || currentView() === "policy";
  if (dirty)
    sessionStorage.setItem("cc-safety-net-draft", draftJson);
  if (!dirty)
    sessionStorage.removeItem("cc-safety-net-draft");
  setDetailStatus("");
  updateActions();
};
var createPathList = (prefix, config) => {
  const setHint = (text) => {
    qs(\`\${prefix}-hint\`).textContent = text;
    qs(\`\${prefix}-hint\`).hidden = !text;
  };
  const render = () => {
    const paths = config.getPaths();
    const disabled = config.isDisabled();
    qs(\`\${prefix}-count\`).textContent = \`\${paths.length} path\${paths.length === 1 ? "" : "s"}\`;
    qs(\`\${prefix}-input\`).disabled = disabled;
    qs(\`\${prefix}-add-button\`).disabled = disabled;
    qs(\`\${prefix}-list\`).innerHTML = paths.length === 0 ? \`<li class="empty">No \${config.itemLabel}s configured.</li>\` : paths.map((path, index) => \`<li class="path-item \${disabled ? "row-disabled" : ""}">
          <code>\${escapeHtml(path)}</code>
          <button type="button" class="icon-button" data-path-list="\${prefix}" data-path-remove="\${index}" \${disabled ? "disabled" : ""} aria-label="Remove \${config.itemLabel} \${escapeHtml(path)}">\${pathListIcons.remove}</button>
        </li>\`).join("");
  };
  const claimForProject = () => {
    if (!projectDraft || markedFields.has(config.field))
      return;
    markedFields.add(config.field);
    config.setPaths([]);
    syncProjectChips();
  };
  let adding = false;
  const add = async (value) => {
    if (adding)
      return;
    const entries = [...new Set(pathLines(value))];
    if (entries.length === 0)
      return;
    const scope = projectDraft;
    const claimed = projectDraft !== null && !markedFields.has(config.field);
    const previousPaths = config.getPaths();
    claimForProject();
    const submitted = qs(\`\${prefix}-input\`).value;
    const additions = entries.filter((entry) => !config.getPaths().includes(entry));
    if (additions.length) {
      adding = true;
      try {
        const error = await config.validateAdditions([...config.getPaths(), ...additions]);
        if (projectDraft !== scope)
          return;
        if (error) {
          setHint(\`Not added: \${additions.join(", ")} — \${error}\`);
          if (claimed) {
            markedFields.delete(config.field);
            config.setPaths(previousPaths);
            syncProjectChips();
          }
          return;
        }
      } finally {
        adding = false;
      }
    }
    const current = config.getPaths();
    const duplicates = entries.filter((entry) => current.includes(entry));
    config.setPaths([...current, ...additions.filter((entry) => !current.includes(entry))]);
    if (qs(\`\${prefix}-input\`).value === submitted)
      qs(\`\${prefix}-input\`).value = "";
    setHint(duplicates.length ? \`Already listed: \${duplicates.join(", ")}\` : "");
    render();
    syncRawFromForm();
    updateDirtyStatus();
    qs(\`\${prefix}-input\`).focus();
  };
  const remove = (index) => {
    claimForProject();
    config.setPaths(config.getPaths().filter((_, position) => position !== index));
    setHint("");
    render();
    syncRawFromForm();
    updateDirtyStatus();
  };
  return { render, add, remove };
};
var validatePathAdditions = async (patch) => {
  const candidate = collectFormPolicy();
  patch(candidate);
  const result = await requestPolicyPreview(candidate);
  if (result.ok && result.data?.preview)
    return null;
  return errorText(result);
};
var pathLists = {
  "deny-paths": createPathList("deny-paths", {
    field: "secret_protection.deny_paths",
    getPaths: () => draftPolicy.secret_protection.deny_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.deny_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "deny path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, deny_paths: paths };
    })
  }),
  "secret-allow-paths": createPathList("secret-allow-paths", {
    field: "secret_protection.allow_paths",
    getPaths: () => draftPolicy.secret_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, allow_paths: paths };
    })
  }),
  "allow-paths": createPathList("allow-paths", {
    field: "destructive_command_protection.allow_paths",
    getPaths: () => draftPolicy.destructive_command_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.destructive_command_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.destructive_command_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.destructive_command_protection = {
        ...candidate.destructive_command_protection,
        allow_paths: paths
      };
    })
  })
};
var pathListFor = (name) => name === "deny-paths" || name === "allow-paths" || name === "secret-allow-paths" ? pathLists[name] : null;
var secretRuleIsActive = (rule, overrides) => overrides[rule.id] ? overrides[rule.id] === "on" : !rule.defaultOff;
var markProjectOverride = (section, ruleId) => {
  if (!projectDraft)
    return;
  markedFields.add(\`\${section}.overrides.\${ruleId}\`);
};
var clearProjectOverrideMarks = (section) => {
  markedFields = new Set([...markedFields].filter((field) => !field.startsWith(\`\${section}.overrides.\`)));
};
var setSecretOverride = (rule, active) => {
  if (!projectDraft && active === !rule.defaultOff) {
    delete draftPolicy.secret_protection.overrides[rule.id];
    return;
  }
  draftPolicy.secret_protection.overrides[rule.id] = active ? "on" : "off";
  markProjectOverride("secret_protection", rule.id);
};
var setDestructiveOverride = (ruleId, active, inheritedEnabled) => {
  if (!projectDraft && active === inheritedEnabled) {
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    return;
  }
  draftPolicy.destructive_command_protection.overrides[ruleId] = active ? "on" : "off";
  markProjectOverride("destructive_command_protection", ruleId);
};
var groupRules = (rules) => rules.reduce((groups, rule) => {
  const group = groups.find((item) => item.category === rule.category);
  if (group) {
    group.rules.push(rule);
    return groups;
  }
  groups.push({ category: rule.category, rules: [rule] });
  return groups;
}, []);
var renderSecretPatterns = () => {
  if (!state)
    return;
  const loaded = state;
  const query = qs("policy-search").value.trim().toLowerCase();
  const rules = state.secretPatterns.filter((rule) => [rule.category, rule.label, rule.id, rule.description, ...rule.paths ?? []].join(" ").toLowerCase().includes(query));
  const overrides = draftPolicy.secret_protection.overrides;
  const disabled = !draftPolicy.secret_protection.enabled;
  const disabledCount = state.secretPatterns.filter((rule) => !secretRuleIsActive(rule, overrides)).length;
  qs("secret-summary").textContent = disabled ? "Protection disabled. Saved rule settings and deny paths are preserved." : \`\${state.secretPatterns.length - disabledCount} active, \${disabledCount} disabled\`;
  qs("secret-patterns").innerHTML = rules.length === 0 ? '<p class="empty">No secret protections match the search.</p>' : groupRules(rules).map((group) => {
    const expanded = secretGroupExpanded.get(group.category) || searchActive && !searchCollapsedSecretGroups.has(group.category);
    const contentId = \`secret-group-\${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`;
    const allGroupRules = loaded.secretPatterns.filter((rule) => rule.category === group.category);
    const onCount = disabled ? 0 : allGroupRules.filter((rule) => secretRuleIsActive(rule, overrides)).length;
    return \`
      <section class="rule-tier">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-secret-group-toggle="\${escapeHtml(group.category)}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${escapeHtml(group.category)}</strong></span>
            <span class="tier-counts">\${tierCountHtml([
      [onCount, "on"],
      [allGroupRules.length - onCount, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-secret-group-active="\${escapeHtml(group.category)}" \${checkbox(allGroupRules.some((rule) => secretRuleIsActive(rule, overrides)))} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${group.category} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
        <div class="grid">\${group.rules.map((rule) => {
      const active = secretRuleIsActive(rule, overrides);
      const ruleState = active && !disabled ? { label: "Active", className: "state-active" } : { label: "Disabled", className: "state-disabled" };
      const control = \`<input type="checkbox" data-secret-active="\${escapeHtml(rule.id)}" \${checkbox(active)} \${disabled ? "disabled" : ""}>
            <span>
              <strong>\${escapeHtml(rule.label)}</strong>
              <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
              <small><span class="\${ruleState.className}">\${ruleState.label}</span> \${escapeHtml(rule.description ?? "")}</small>
            </span>\`;
      const chip = projectFieldChip(\`secret_protection.overrides.\${rule.id}\`, true);
      if (!rule.paths) {
        return \`<label class="row \${disabled ? "row-disabled" : ""}">\${control}\${chip}</label>\`;
      }
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
            <label class="rule-control">\${control}</label>
            <button type="button" class="rule-example-button" data-secret-paths="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show protected paths for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
            \${chip}
          </div>\`;
    }).join("")}</div>
        </div>
      </section>
    \`;
  }).join("");
};
var presetName = () => safetyLevels[draftPolicy.safety.level][0];
var renderPresetStatus = () => {
  if (!preview)
    return;
  const customized = preview.counts.effectiveCustomizations > 0 || Object.entries(draftPolicy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key]);
  qs("safety-preset-status").textContent = customized ? \`\${presetName()} · Customized\` : "";
  qs("safety-preset-status").classList.toggle("customized", customized);
};
var renderSafety = () => {
  const environmentSources = preview ? [
    ...new Set(Object.values(preview.capabilities).filter((capability) => capability.source === "environment").flatMap((capability) => capability.sources.filter((source) => source.startsWith("env "))))
  ] : [];
  qs("environment-overrides").hidden = environmentSources.length === 0;
  qs("environment-overrides").textContent = environmentSources.length ? \`Environment-raised protection: \${environmentSources.join(", ")}\` : "";
  qs("safety-level").innerHTML = projectFieldLine("safety.level") + Object.entries(safetyLevels).map(([level, meta]) => \`<label class="row preset-\${level}"><input type="radio" name="safety-level" value="\${level}" \${checkbox(draftPolicy.safety.level === level)}><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span></label>\`).join("");
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs("safety-overrides").innerHTML = Object.entries(safetyOverrides).map(([key, meta]) => {
    const value = draftPolicy.safety.overrides[key];
    const inheritedText = inherited[key] ? "on" : "off";
    return \`<label class="row safety-override-row"><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span><select data-safety-override="\${key}">
      <option value="inherit" \${value === undefined ? "selected" : ""}>Inherit from preset (\${inheritedText})</option>
      <option value="true" \${value === true ? "selected" : ""}>Force on</option>
      <option value="false" \${value === false ? "selected" : ""}>Force off</option>
    </select>\${projectFieldChip(\`safety.overrides.\${key}\`, true)}</label>\`;
  }).join("");
  qs("workflow").innerHTML = \`<label class="row"><input type="checkbox" data-workflow-worktree \${checkbox(draftPolicy.workflow.worktree_mode)}><span><strong>Allow discarding local changes in linked git worktrees</strong><small>Only relaxes linked worktree discard checks.</small></span>\${projectFieldChip("workflow.worktree_mode")}</label>\`;
  renderPresetStatus();
};
var tierForRule = (rule) => {
  if (!rule.activationCapability)
    return "normal";
  return rule.activationCapability === "fail_closed" ? "strict" : "paranoid";
};
var tierMeta = {
  normal: ["Available in every preset", "No additional capability required"],
  strict: ["Strict tier", "Inherits from Fail closed"],
  paranoid: ["Paranoid tier", "Inherits from Paranoid rm or Paranoid interpreters"]
};
var ruleStateText = (rule, effective, capabilities) => {
  const capability = rule.activationCapability;
  if (effective.source === "master_disabled")
    return "Off — destructive-command protection disabled";
  if (effective.source === "rule_override")
    return \`\${effective.enabled ? "On" : "Off"} — user rule override\`;
  if (effective.source === "built_in_default")
    return "On — available in every preset";
  if (effective.source === "environment") {
    const sources = capability ? capabilities[capability]?.sources ?? [] : [];
    const source = [...sources].reverse().find((item) => item.startsWith("env "));
    return \`\${effective.enabled ? "On" : "Off"} — environment\${source ? \`; \${source.slice(4)}\` : ""}\`;
  }
  if (effective.source === "capability_override" && capability) {
    return \`\${effective.enabled ? "On" : "Off"} — capability override; \${safetyOverrides[capability][0]} forced \${effective.enabled ? "on" : "off"}\`;
  }
  if (effective.enabled)
    return \`On — \${presetName()} preset\`;
  return \`Off — \${presetName()} preset; requires \${tierForRule(rule) === "strict" ? "Strict" : "Paranoid"}\`;
};
var showRulePopover = (button, label, title, body) => {
  const popover = qs("rule-example-popover");
  qs("rule-example-label").textContent = label;
  qs("rule-example-title").textContent = title;
  qs("rule-example-command").textContent = body;
  if (!popover.matches(":popover-open"))
    popover.showPopover();
  const buttonRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const gap = 8;
  const edge = 12;
  const below = buttonRect.bottom + gap;
  const top = below + popoverRect.height <= window.innerHeight - edge ? below : Math.max(edge, buttonRect.top - gap - popoverRect.height);
  const left = Math.min(window.innerWidth - popoverRect.width - edge, Math.max(edge, buttonRect.right - popoverRect.width));
  popover.style.top = \`\${top}px\`;
  popover.style.left = \`\${left}px\`;
};
var openRuleExample = (button) => {
  const rule = state?.destructiveCommandRules.find((item) => item.id === button.dataset.ruleExample);
  if (!rule)
    return;
  showRulePopover(button, "Blocked command example", rule.label, rule.example);
};
var openSecretPaths = (button) => {
  const rule = state?.secretPatterns.find((item) => item.id === button.dataset.secretPaths);
  if (!rule?.paths)
    return;
  showRulePopover(button, "Protected paths", rule.label, rule.paths.join(\`
\`));
};
var renderDestructiveCommands = () => {
  if (!state || !preview)
    return;
  const loaded = state;
  const effectiveState = preview;
  const query = qs("policy-search").value.trim().toLowerCase();
  const matchingRules = state.destructiveCommandRules.filter((rule) => [rule.category, rule.label, rule.id, rule.description, tierMeta[tierForRule(rule)][0]].join(" ").toLowerCase().includes(query));
  qs("destructive-command-summary").textContent = draftPolicy.destructive_command_protection.enabled ? \`\${preview.counts.enabled} active, \${preview.counts.disabled} disabled\` : "Configurable protection disabled. Catastrophic protections remain active; saved rule settings and allow paths are preserved.";
  const enforcedRules = matchingRules.filter((rule) => rule.catastrophic);
  const configurableRules = matchingRules.filter((rule) => !rule.catastrophic);
  const enforcedExpanded = tierExpanded.get("enforced") || searchActive && !searchCollapsedTiers.has("enforced");
  const enforcedSection = enforcedRules.length === 0 ? "" : \`<section class="rule-tier rule-tier-enforced">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="enforced" aria-expanded="\${enforcedExpanded}" aria-controls="destructive-tier-enforced">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>Always enforced</strong><small>Cannot be disabled by any preset, rule override, or allow path</small></span>
            <span class="tier-counts">\${enforcedRules.length} protection\${enforcedRules.length === 1 ? "" : "s"}</span>
          </button>
        </div>
        <div id="destructive-tier-enforced" class="tier-content" \${enforcedExpanded ? "" : "hidden"}>
          \${groupRules(enforcedRules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => \`<div class="row rule-row">
                <span class="rule-control">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="state-active">Always enforced</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </span>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
              </div>\`).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  qs("destructive-command-rules").innerHTML = matchingRules.length === 0 ? '<p class="empty">No built-in protections match the search.</p>' : enforcedSection + Object.keys(tierMeta).map((tier) => {
    const rules = configurableRules.filter((rule) => tierForRule(rule) === tier);
    if (rules.length === 0)
      return "";
    const allTierRules = loaded.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === tier);
    const tierStates = allTierRules.flatMap((rule) => effectiveState.rules[rule.id] ?? []);
    const expanded = tierExpanded.get(tier) || searchActive && !searchCollapsedTiers.has(tier);
    const contentId = \`destructive-tier-\${tier}\`;
    return \`<section class="rule-tier rule-tier-\${tier}">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="\${tier}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${tierMeta[tier][0]}</strong><small>\${tierMeta[tier][1]}</small></span>
            <span class="tier-counts">\${tierCountHtml([
      [tierStates.filter((item) => item.enabled).length, "on"],
      [tierStates.filter((item) => !item.enabled).length, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-destructive-tier-active="\${tier}" \${checkbox(tierStates.some((item) => item.enabled))} \${!draftPolicy.destructive_command_protection.enabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${tierMeta[tier][0]} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
          \${groupRules(rules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => {
      const effective = effectiveState.rules[rule.id];
      if (!effective)
        return "";
      const override = draftPolicy.destructive_command_protection.overrides[rule.id];
      const status = ruleStateText(rule, effective, effectiveState.capabilities);
      const disabled = !draftPolicy.destructive_command_protection.enabled;
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
                <label class="rule-control">
                  <input type="checkbox" data-destructive-command-active="\${escapeHtml(rule.id)}" \${checkbox(effective.enabled)} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`\${rule.label}: \${status}\`)}">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="\${effective.enabled ? "state-active" : "state-disabled"}">\${escapeHtml(status)}</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </label>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
                \${override && !effective.changesInherited ? \`<button type="button" class="inherit-button" data-use-inherited="\${escapeHtml(rule.id)}">Use inherited setting</button>\` : ""}
                \${projectFieldChip(\`destructive_command_protection.overrides.\${rule.id}\`, true)}
              </div>\`;
    }).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  }).join("");
};
var refreshPolicyPreview = async () => {
  const requestId = ++previewRequestId;
  const result = await requestPolicyPreview(effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null));
  if (requestId !== previewRequestId)
    return false;
  if (!result.ok || !result.data?.preview) {
    setAppStatus("Preview failed", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  preview = result.data.preview;
  renderProtectionCard();
  renderSafety();
  renderDestructiveCommands();
  runCommandTest();
  return true;
};
var testerRequestId = 0;
var runCommandTest = async () => {
  const command = qs("tester-input").value.trim();
  if (!command) {
    qs("tester-result").hidden = true;
    return;
  }
  const requestId = ++testerRequestId;
  const result = await requestJson("/api/policy/explain", {
    method: "POST",
    body: JSON.stringify({
      command,
      policy: effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null)
    })
  });
  if (requestId !== testerRequestId)
    return;
  const el = qs("tester-result");
  el.hidden = false;
  if (!result.ok) {
    el.className = "status error";
    el.textContent = \`Could not evaluate: \${errorText(result)}\`;
    return;
  }
  if (result.data.result === "allowed") {
    el.className = "status ok";
    el.innerHTML = \`Allowed — no rule blocks this command under the current draft policy. <button type="button" class="feed-toggle" data-create-rule="\${escapeHtml(command)}">Create a rule for this</button>\`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleIdHtml = result.data.customRule ? \`<button type="button" class="rule-id" data-jump-custom-rule="\${escapeHtml(ruleId)}" title="Show this rule in Rules">\${escapeHtml(ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(ruleId)}</code>\`;
  const segment = result.data.segment && result.data.segment !== command ? \`<div class="tester-segment">Segment: <code>\${escapeHtml(result.data.segment)}</code></div>\` : "";
  el.className = "status error";
  el.innerHTML = \`Blocked\${ruleId ? \` by \${ruleIdHtml}\` : ""} — \${escapeHtml(result.data.reason || "")}\${segment}\`;
};
function render() {
  if (!state)
    return;
  draftPolicy = clonePolicy(state.policy);
  preview = state.preview;
  knownRuleIds = new Set([...state.destructiveCommandRules, ...state.secretPatterns].map((rule) => rule.id));
  dirty = false;
  qs("policy-savebar").hidden = true;
  qs("dirty-chip").hidden = true;
  qs("policy-path").textContent = state.path + (state.exists ? "" : " (not created yet)");
  const projectPolicy = state.projectPolicy;
  qs("project-policy-row").hidden = !projectPolicy;
  qs("project-policy-path").textContent = projectPolicy?.path ?? "";
  qs("project-policy-notice").hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs("project-policy-notice").textContent = projectPolicy ? ["Merged on top of this file:", ...projectPolicy.weakenings].join(\`
\`) : "";
  qs("app-version").textContent = state.version;
  renderSafety();
  qs("destructive-command").innerHTML = '<label class="row master"><input type="checkbox" data-destructive-command-enabled ' + checkbox(state.policy.destructive_command_protection.enabled) + '><span><strong>Destructive command protection</strong><small>Block configurable destructive git, filesystem, and execution patterns. Catastrophic and custom rules remain active when disabled.</small></span><span class="master-badge">' + (state.policy.destructive_command_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="destructive-enabled-chip"></span></label>' + '<div id="destructive-command-rules"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="allow-paths-label">Allow paths</strong><small>Recursive deletes targeting these paths are not blocked, like /tmp. The home directory, or any path containing it, is rejected.</small></span><span class="tier-counts" id="allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="allow-paths-content" hidden>' + '<p class="muted">Use an absolute path or a ~/ path. Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="allow-paths-input" data-path-input="allow-paths" autocomplete="off" spellcheck="false" placeholder="/absolute/path or ~/path" aria-labelledby="allow-paths-label"><button type="button" class="icon-button" id="allow-paths-add-button" data-path-add="allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="allow-paths-chip"></span>' + '<ul class="paths-list" id="allow-paths-list"></ul>' + "</div></section>";
  qs("secret").innerHTML = '<label class="row master"><input type="checkbox" id="secret-enabled" ' + checkbox(state.policy.secret_protection.enabled) + '><span><strong>Secret protection</strong><small>Block default sensitive paths, coding CLI credential locations, and configured deny paths.</small></span><span class="master-badge">' + (state.policy.secret_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="secret-enabled-chip"></span></label>' + '<div id="secret-patterns"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="deny-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="deny-paths-label">Deny paths</strong><small>Configured paths and everything inside them are blocked while Secret protection is on.</small></span><span class="tier-counts" id="deny-paths-count"></span></button>' + '<div class="tier-content paths-content" id="deny-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="deny-paths-input" data-path-input="deny-paths" autocomplete="off" spellcheck="false" placeholder="path/to/protect" aria-labelledby="deny-paths-label"><button type="button" class="icon-button" id="deny-paths-add-button" data-path-add="deny-paths" aria-label="Add deny path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="deny-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="deny-paths-chip"></span>' + '<ul class="paths-list" id="deny-paths-list"></ul>' + "</div></section>" + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="secret-allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="secret-allow-paths-label">Allow paths</strong><small>Configured files and subtrees are exempt from the pattern rules. Deny paths and coding CLI protections still apply. Entries covering the home directory are rejected, and glob patterns are not supported.</small></span><span class="tier-counts" id="secret-allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="secret-allow-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="secret-allow-paths-input" data-path-input="secret-allow-paths" autocomplete="off" spellcheck="false" placeholder="~/project/.env.test or ~/project/fixtures" aria-labelledby="secret-allow-paths-label"><button type="button" class="icon-button" id="secret-allow-paths-add-button" data-path-add="secret-allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="secret-allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="secret-allow-paths-chip"></span>' + '<ul class="paths-list" id="secret-allow-paths-list"></ul>' + "</div></section>";
  qs("raw").value = state.errors.length ? state.raw : formatPolicy(draftPolicy);
  qs("policy-search").value = "";
  syncSearchState();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  updateRawSource();
  renderRetention(state);
  qs("recovery").hidden = state.errors.length === 0;
  updateActions();
  renderProtectionCard();
  if (state.errors.length) {
    if (currentView() !== "policy")
      location.hash = "policy";
    setAppStatus("Repair required", "error");
    setDetailStatus(\`Error: \${state.errors.join(\`
\`)}\`, "error");
    return;
  }
  setAppStatus("");
  setDetailStatus("");
}
var restoreDraft = () => {
  if (!state || state.errors.length)
    return;
  const stored = sessionStorage.getItem("cc-safety-net-draft");
  if (!stored)
    return;
  const parsed = (() => {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  })();
  const isRecordField = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
  const isOptionalPathList = (value) => value === undefined || Array.isArray(value) && value.every((item) => typeof item === "string");
  const isPolicyShape = isRecordField(parsed) && isRecordField(parsed.safety) && typeof parsed.safety.level === "string" && Object.hasOwn(safetyLevels, parsed.safety.level) && isRecordField(parsed.safety.overrides) && isRecordField(parsed.workflow) && isRecordField(parsed.destructive_command_protection) && isRecordField(parsed.destructive_command_protection.overrides) && isOptionalPathList(parsed.destructive_command_protection.allow_paths) && isRecordField(parsed.secret_protection) && isRecordField(parsed.secret_protection.overrides) && isOptionalPathList(parsed.secret_protection.deny_paths) && isOptionalPathList(parsed.secret_protection.allow_paths) && isRecordField(parsed.audit);
  if (!isPolicyShape || stored === JSON.stringify(state.policy)) {
    sessionStorage.removeItem("cc-safety-net-draft");
    return;
  }
  const draft = parsed;
  draft.destructive_command_protection.allow_paths ??= [];
  draft.secret_protection.deny_paths ??= [];
  draft.secret_protection.allow_paths ??= [];
  draftPolicy = draft;
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Restored unsaved draft", "ok");
};
function renderPolicySections() {
  const masterToggle = document.querySelector("[data-destructive-command-enabled]");
  if (masterToggle)
    masterToggle.checked = draftPolicy.destructive_command_protection.enabled;
  qs("secret-enabled").checked = draftPolicy.secret_protection.enabled;
  syncMasterBadges();
  renderSafety();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  syncRawFromForm();
  updateDirtyStatus();
}
async function load() {
  const result = await requestJson("/api/policy");
  if (!result.ok || !result.data) {
    setAppStatus("Load failed", "error");
    setDetailStatus(\`Error: Could not load policy: \${errorText(result)}\`, "error");
    return false;
  }
  state = result.data;
  render();
  restoreDraft();
  return true;
}
var targetInput = (event) => event.target instanceof HTMLInputElement ? event.target : null;
var targetElement = (event) => event.target instanceof Element ? event.target : null;
document.addEventListener("input", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "policy-search") {
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    return;
  }
  if (input.id === "activity-search" && activity) {
    if (clearCommandFilter())
      renderActivityControls();
    activityFilters.query = input.value.trim().toLowerCase();
    clearTimeout(activityQueryTimer);
    activityQueryTimer = setTimeout(renderActivityFeed, 120);
  }
});
document.addEventListener("keydown", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "tester-input" && event.key === "Enter") {
    event.preventDefault();
    runCommandTest();
    return;
  }
  const list = pathListFor(input.dataset.pathInput);
  if (!list || event.key !== "Enter")
    return;
  event.preventDefault();
  list.add(input.value);
});
document.addEventListener("paste", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  const list = pathListFor(input.dataset.pathInput);
  if (!list)
    return;
  const text = event.clipboardData?.getData("text") ?? "";
  if (!text.includes(\`
\`))
    return;
  event.preventDefault();
  list.add(\`\${input.value}
\${text}\`);
});
var writePolicy = async (path, body, failureStatus) => {
  const result = await requestJson(path, { method: "POST", body });
  if (isWriteSuccess(result))
    return result;
  setAppStatus(failureStatus, "error");
  setDetailStatus(\`Error: \${errorText(result)}\`, "error");
  return null;
};
var reloadAfterWrite = async () => {
  sessionStorage.removeItem("cc-safety-net-draft");
  if (!await load())
    return false;
  dirty = false;
  setDetailStatus("");
  return true;
};
var setProjectDraftDiagnostics = (messages) => {
  qs("project-draft-diagnostics").textContent = messages.join(\`
\`);
  qs("project-draft-diagnostics").hidden = messages.length === 0;
};
var renderProjectDraftBar = () => {
  qs("project-draft-enter").hidden = projectDraft !== null;
  qs("project-draft-bar").hidden = projectDraft === null;
  qs("save").textContent = projectDraft ? "Review & apply" : "Save";
  if (!projectDraft)
    return;
  qs("project-draft-path").textContent = projectDraft.path;
  qs("project-draft-change").hidden = !projectDraft.canPickDirectory;
};
var exitProjectDraft = () => {
  projectDraft = null;
  markedFields = new Set;
  setProjectDraftDiagnostics([]);
  if (state)
    draftPolicy = clonePolicy(state.policy);
  renderProjectDraftBar();
  renderPolicySections();
};
var ingestProjectState = async (okStatus) => {
  const result = await requestJson("/api/policy/project");
  if (!result.ok || !result.data) {
    setAppStatus("Project draft unavailable", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await load();
    setAppStatus("Repair required", "error");
    setDetailStatus([
      "Error: repair your user policy before drafting a project policy.",
      ...Array.isArray(result.data.userPolicyDiagnostics) ? result.data.userPolicyDiagnostics : []
    ].join(\`
\`), "error");
    return false;
  }
  projectDraft = {
    path: result.data.path,
    revision: result.data.revision,
    canPickDirectory: result.data.canPickDirectory === true,
    baseline: seeded.baseline,
    snapshot: seeded.snapshot
  };
  markedFields = seeded.marked;
  draftPolicy = seeded.policy;
  setProjectDraftDiagnostics(Array.isArray(result.data.projectionDiagnostics) ? result.data.projectionDiagnostics : []);
  renderProjectDraftBar();
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus(okStatus, "ok");
  return true;
};
var enterProjectDraft = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: repair your user policy before drafting a project policy.", "error");
    return;
  }
  if (dirty) {
    if (!await confirmDialog({
      title: "Discard unsaved policy changes?",
      body: "A project draft starts from your saved user policy. Save your changes first, or discard them here.",
      confirmLabel: "Discard changes",
      confirmClass: ""
    }))
      return;
    sessionStorage.removeItem("cc-safety-net-draft");
    if (!await load())
      return;
  }
  await ingestProjectState("Drafting a project policy.");
};
var confirmDiscardProjectDraft = async (body) => !dirty || await confirmDialog({
  title: "Discard this project draft?",
  body,
  confirmLabel: "Discard draft",
  confirmClass: ""
});
var changeProjectDirectory = async () => {
  if (!await confirmDiscardProjectDraft("Switching projects discards this draft."))
    return;
  const result = await requestJson("/api/policy/project/choose-directory", { method: "POST" });
  if (!result.ok) {
    setAppStatus("Could not open the folder picker", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return;
  }
  if (result.data.error) {
    setAppStatus(result.data.error, "error");
    return;
  }
  if (result.data.cancelled)
    return;
  await ingestProjectState("Drafting a project policy.");
};
var leaveProjectDraft = async () => {
  if (!await confirmDiscardProjectDraft("The fields you marked are not written anywhere yet."))
    return;
  exitProjectDraft();
  if (await load())
    setAppStatus("Left the project draft.", "ok");
};
var discardProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  if (!await confirmDialog({
    title: "Discard changes to this draft?",
    body: "The draft returns to the fields this project already sets.",
    confirmLabel: "Discard changes",
    confirmClass: ""
  }))
    return;
  const snapshot = JSON.parse(draft.snapshot);
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Changes discarded.", "ok");
};
var handleStaleProjectDraft = async () => {
  if (!await ingestProjectState("Project draft reloaded."))
    return;
  setAppStatus("Project target changed", "error");
  setDetailStatus("Error: the project directory changed, so this draft was reloaded for the new target. Review it again before applying.", "error");
};
var projectDiffHtml = (data) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...data.existingFileDiagnostics?.length ? ["The existing project policy file is invalid and will be replaced."] : [],
    ...data.weakenings ?? []
  ];
  const table = rows.length === 0 ? '<p class="empty">No change to the effective policy.</p>' : \`<table class="diff-table"><thead><tr><th>Setting</th><th>Now</th><th>After</th></tr></thead><tbody>\${rows.map((row) => \`<tr><td><code>\${escapeHtml(row.field)}</code></td><td class="diff-before">\${escapeHtml(row.before ?? "(unset)")}</td><td class="diff-after">\${escapeHtml(row.after ?? "(unset)")}</td></tr>\`).join("")}</tbody></table>\`;
  return table + warnings.map((text) => \`<p class="diff-warning">\${escapeHtml(text)}</p>\`).join("");
};
var reviewProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  const proposal = collectProjectProposal(markedFields, draftPolicy);
  const serialized = JSON.stringify(proposal);
  const body = JSON.stringify({ revision: draft.revision, proposal });
  const diff = await requestJson("/api/policy/project/diff", { method: "POST", body });
  if (projectDraft !== draft)
    return;
  if (diff.status === 409) {
    await handleStaleProjectDraft();
    return;
  }
  if (!diff.ok) {
    setAppStatus("Review failed", "error");
    setDetailStatus(\`Error: \${errorText(diff)}\`, "error");
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    setAppStatus("Review again", "error");
    setDetailStatus("Error: the draft changed while the review was loading. Review it again.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Apply this project policy?",
    body: "Everyone who works in this project gets these changes on top of their own user policy.",
    detail: draft.path,
    rowsHtml: projectDiffHtml(diff.data),
    confirmLabel: "Apply project policy",
    confirmClass: "primary"
  }))
    return;
  await runExclusive("Applying...", async () => {
    const applied = await requestJson("/api/policy/project/apply", { method: "POST", body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      setAppStatus("Apply failed", "error");
      setDetailStatus(\`Error: \${errorText(applied)}\`, "error");
      return;
    }
    const path = applied.data.path;
    exitProjectDraft();
    if (await load())
      setAppStatus(\`Applied \${path}.\`, "ok");
  });
};
var saveRetentionDays = async (days) => {
  const saved = state;
  if (!saved)
    return;
  const current = saved.policy.audit.retention_days;
  if (!Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus(\`Error: retention must be a whole number of days from \${MIN_AUDIT_RETENTION_DAYS} to \${MAX_AUDIT_RETENTION_DAYS}.\`, "error");
    return;
  }
  if (days === current)
    return;
  if (projectDraft) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (dirty) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: save or discard your unsaved Policy changes first.", "error");
    return;
  }
  if (days < current && !await confirmDialog({
    title: \`Shorten retention to \${dayCount(days)}?\`,
    body: \`Audit entries older than \${dayCount(days)} are deleted on the next sweep and cannot be recovered. The Activity tab will only look back \${dayCount(days)}.\`,
    detail: overview?.logsDir ?? "",
    confirmLabel: "Shorten",
    confirmClass: "danger"
  })) {
    qs("retention-days").value = String(current);
    return;
  }
  await runExclusive("Saving...", async () => {
    const policy = clonePolicy(saved.policy);
    policy.audit.retention_days = days;
    if (!await writePolicy("/api/policy", JSON.stringify(policy), "Save failed")) {
      qs("retention-days").value = String(current);
      return;
    }
    if (!await load())
      return;
    activityFilters.days = Math.min(activityFilters.days, days);
    await Promise.all([loadOverview(), loadActivity()]);
    setAppStatus(\`Retention set to \${dayCount(days)}.\`, "ok");
    setDetailStatus("");
  });
};
document.addEventListener("change", (event) => {
  const control = event.target;
  if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement))
    return;
  if (control.id === "activity-days") {
    activityFilters.days = Number(control.value);
    loadActivity();
    return;
  }
  if (control.id === "retention-days") {
    saveRetentionDays(Number(control.value));
    return;
  }
  if (control.name === "safety-level") {
    draftPolicy.safety.level = control.value;
    markProjectField("safety.level");
    renderSafety();
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (control.dataset?.safetyOverride) {
    if (control.value === "inherit" && !projectDraft)
      delete draftPolicy.safety.overrides[control.dataset.safetyOverride];
    if (control.value === "true")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = true;
    if (control.value === "false")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = false;
    if (control.value === "inherit")
      unmarkProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    if (control.value !== "inherit")
      markProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  const input = control instanceof HTMLInputElement ? control : null;
  if (!input)
    return;
  if ("workflowWorktree" in input.dataset) {
    draftPolicy.workflow.worktree_mode = input.checked;
    markProjectField("workflow.worktree_mode");
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if ("destructiveCommandEnabled" in input.dataset) {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable destructive command protection?",
        body: "Built-in destructive git, filesystem, and execution protections will stop blocking commands until you turn this back on.",
        detail: "Custom rules remain active."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.destructive_command_protection.enabled = input.checked;
      markProjectField("destructive_command_protection.enabled");
      syncMasterBadges();
      pathLists["allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (input.dataset?.destructiveTierActive) {
    const effectiveState = preview;
    if (!effectiveState)
      return;
    state?.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === input.dataset.destructiveTierActive).forEach((rule) => {
      setDestructiveOverride(rule.id, input.checked, effectiveState.rules[rule.id]?.inheritedEnabled);
    });
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.destructiveCommandActive) {
    const ruleId = input.dataset.destructiveCommandActive;
    setDestructiveOverride(ruleId, input.checked, preview?.rules[ruleId]?.inheritedEnabled);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.secretGroupActive) {
    state?.secretPatterns.filter((rule) => rule.category === input.dataset.secretGroupActive).forEach((rule) => {
      setSecretOverride(rule, input.checked);
    });
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.dataset?.secretActive) {
    const rule = state?.secretPatterns.find((item) => item.id === input.dataset.secretActive);
    if (!rule)
      return;
    setSecretOverride(rule, input.checked);
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.id === "secret-enabled") {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable secret protection?",
        body: "Default sensitive paths, coding CLI credential locations, and deny paths will stop blocking access until you turn this back on."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.secret_protection.enabled = input.checked;
      markProjectField("secret_protection.enabled");
      syncMasterBadges();
      renderSecretPatterns();
      pathLists["deny-paths"].render();
      pathLists["secret-allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
    })();
  }
});
document.addEventListener("click", (event) => {
  const target = targetElement(event);
  if (!target)
    return;
  if (target.closest("#tester-run")) {
    runCommandTest();
    return;
  }
  if (target.closest("#project-draft-enter")) {
    enterProjectDraft();
    return;
  }
  if (target.closest("#project-draft-change")) {
    changeProjectDirectory();
    return;
  }
  if (target.closest("#project-draft-exit")) {
    leaveProjectDraft();
    return;
  }
  const unmarkButton = target.closest("[data-unmark-field]");
  if (unmarkButton) {
    unmarkProjectField(unmarkButton.dataset.unmarkField ?? "");
    return;
  }
  const createRule = target.closest("[data-create-rule]");
  if (createRule) {
    openRuleComposer(createRule.dataset.createRule ?? "");
    return;
  }
  const feedToggle = target.closest("[data-feed-toggle]");
  if (feedToggle) {
    const command = feedToggle.previousElementSibling;
    if (!command)
      return;
    const expanded = command.classList.toggle("expanded");
    feedToggle.setAttribute("aria-expanded", String(expanded));
    feedToggle.textContent = expanded ? "Show less" : "Show more";
    return;
  }
  const feedCopy = target.closest("[data-log-copy]");
  if (feedCopy) {
    copyFeedEntry(feedCopy);
    return;
  }
  const feedReport = target.closest("[data-report-fp]");
  if (feedReport) {
    openReportDialog(feedReport);
    return;
  }
  const blockFuture = target.closest("[data-block-future]");
  if (blockFuture) {
    const entry = renderedFeedEntries[Number(blockFuture.dataset.blockFuture)];
    if (entry?.segment || entry?.command)
      openRuleComposer(entry.segment || entry.command || "");
    return;
  }
  const topRule = target.closest(".top-rule");
  if (topRule) {
    const ruleId = topRule.dataset.ruleId ?? "";
    (ruleId.startsWith("custom.") ? jumpToRulesRule : jumpToActivityRule)(ruleId);
    return;
  }
  const ruleActivity = target.closest("[data-rule-activity]");
  if (ruleActivity) {
    jumpToActivityRule(ruleActivity.dataset.ruleActivity ?? "");
    return;
  }
  const jumpRule = target.closest("[data-jump-rule]");
  if (jumpRule) {
    qs("policy-search").value = jumpRule.dataset.jumpRule ?? "";
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    location.hash = "policy";
    return;
  }
  const jumpCustom = target.closest("[data-jump-custom-rule]");
  if (jumpCustom) {
    jumpToRulesRule(jumpCustom.dataset.jumpCustomRule ?? "");
    return;
  }
  const topCommand = target.closest(".top-command");
  if (topCommand) {
    activityFilters.command = topCommand.dataset.command ?? "";
    activityFilters.decision = "deny";
    activityFilters.query = "";
    qs("activity-search").value = "";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  if (target.closest("[data-clear-command]")) {
    clearCommandFilter();
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#guard-errors")) {
    clearCommandFilter();
    activityFilters.decision = "error";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  const chip = target.closest("[data-activity-chip]");
  if (chip && activity) {
    clearCommandFilter();
    activityFilters[chip.dataset.activityChip] = chip.dataset.chipValue ?? "";
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#activity-refresh")) {
    refreshActivity();
    return;
  }
  if (target.closest("#integrations-refresh")) {
    refreshIntegrations();
    return;
  }
  if (target.closest("#rules-refresh")) {
    refreshRules();
    return;
  }
  const scopeChip = target.closest("[data-rules-scope]");
  if (scopeChip) {
    setRulesScope(scopeChip.dataset.rulesScope ?? "");
    return;
  }
  const exampleChip = target.closest("[data-rules-example]");
  if (exampleChip) {
    qs("rules-composer-input").value = exampleChip.dataset.rulesExample ?? "";
    return;
  }
  if (target.closest("#rules-choose-directory")) {
    chooseProjectDirectory();
    return;
  }
  if (target.closest("#rules-copy-prompt")) {
    copyRulePrompt();
    return;
  }
  const integrationButton = target.closest("[data-integration-action]");
  if (integrationButton) {
    runIntegrationAction(integrationButton);
    return;
  }
  const ruleExampleButton = target.closest("[data-rule-example]");
  if (ruleExampleButton) {
    openRuleExample(ruleExampleButton);
    return;
  }
  const secretPathsButton = target.closest("[data-secret-paths]");
  if (secretPathsButton) {
    openSecretPaths(secretPathsButton);
    return;
  }
  const tierButton = target.closest("[data-tier-toggle]");
  if (tierButton) {
    const tier = tierButton.dataset.tierToggle ?? "";
    const expanded = tierButton.getAttribute("aria-expanded") === "true";
    tierExpanded.set(tier, !expanded);
    if (searchActive && expanded)
      searchCollapsedTiers.add(tier);
    if (!expanded)
      searchCollapsedTiers.delete(tier);
    renderDestructiveCommands();
    return;
  }
  const secretGroupButton = target.closest("[data-secret-group-toggle]");
  if (secretGroupButton) {
    const category = secretGroupButton.dataset.secretGroupToggle ?? "";
    const expanded = secretGroupButton.getAttribute("aria-expanded") === "true";
    secretGroupExpanded.set(category, !expanded);
    if (searchActive && expanded)
      searchCollapsedSecretGroups.add(category);
    if (!expanded)
      searchCollapsedSecretGroups.delete(category);
    renderSecretPatterns();
    return;
  }
  if (target.closest("[data-secret-group-active], [data-destructive-tier-active]"))
    return;
  const button = target.closest(".panel-toggle, .rule-tier-head");
  if (button) {
    togglePanel(button);
    return;
  }
  const inheritedButton = target.closest("[data-use-inherited]");
  if (inheritedButton) {
    const ruleId = inheritedButton.dataset.useInherited ?? "";
    if (projectDraft) {
      unmarkProjectField(\`destructive_command_protection.overrides.\${ruleId}\`);
      return;
    }
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (target.closest("#reset-rule-customizations")) {
    if (Object.keys(draftPolicy.destructive_command_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in destructive-command rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("destructive_command_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.destructive_command_protection.overrides = {};
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#reset-secret-customizations")) {
    if (Object.keys(draftPolicy.secret_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in secret rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("secret_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.secret_protection.overrides = {};
      renderSecretPatterns();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#discard-changes")) {
    if (projectDraft) {
      discardProjectDraft();
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Discard unsaved changes?",
        body: "All changes since your last save will be reverted.",
        confirmLabel: "Discard changes",
        confirmClass: ""
      }))
        return;
      runExclusive("Discarding...", async () => {
        sessionStorage.removeItem("cc-safety-net-draft");
        if (await load())
          setAppStatus("Changes discarded.", "ok");
      });
    })();
    return;
  }
  const addButton = target.closest("[data-path-add]");
  if (addButton) {
    const list = pathListFor(addButton.dataset.pathAdd);
    if (list)
      list.add(qs(\`\${addButton.dataset.pathAdd}-input\`).value);
    return;
  }
  const removeButton = target.closest("[data-path-remove]");
  if (removeButton)
    pathListFor(removeButton.dataset.pathList)?.remove(Number(removeButton.dataset.pathRemove));
  const starButton = target.closest(".star-cta");
  if (starButton instanceof HTMLButtonElement) {
    starRepo(starButton);
    return;
  }
});
qs("dirty-chip").onclick = () => {
  location.hash = "policy";
};
qs("save").onclick = () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: Repair policy before saving changes.", "error");
    return;
  }
  if (projectDraft) {
    reviewProjectDraft();
    return;
  }
  if (!dirty) {
    setAppStatus("No changes to save", "ok");
    setDetailStatus("");
    return;
  }
  const policy = collectFormPolicy();
  runExclusive("Saving...", async () => {
    const result = await writePolicy("/api/policy", JSON.stringify(policy), "Save failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Saved \${result.data.path}.\`, "ok");
  });
};
qs("repair").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length === 0) {
    setAppStatus("");
    setDetailStatus("");
    return;
  }
  if (!await confirmDialog({
    title: "Repair policy?",
    body: "This will write canonical policy JSON. Valid settings are preserved; invalid fields are discarded. If the JSON cannot be parsed, defaults are restored.",
    detail: state.path,
    confirmLabel: "Repair",
    confirmClass: "primary"
  })) {
    return;
  }
  runExclusive("Repairing...", async () => {
    const result = await writePolicy("/api/repair", "{}", "Repair failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Repaired \${result.data.path}.\`, "ok");
  });
};
qs("reset").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (projectDraft) {
    setAppStatus("Reset unavailable", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Reset policy?",
    body: "This will restore the default policy JSON at this path.",
    detail: state.path,
    confirmLabel: "Reset policy"
  })) {
    return;
  }
  runExclusive("Resetting...", async () => {
    const result = await writePolicy("/api/reset", "{}", "Reset failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Reset \${result.data.path} to defaults.\`, "ok");
  });
};
setRawCopyCopied(false);
qs("raw-copy").onclick = () => {
  copyRawToClipboard();
};
var themeOrder = ["auto", "light", "dark"];
var themeIcons = {
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"></rect><path d="M8 20h8M12 16v4"></path></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"></path></svg>',
  dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>'
};
var themeLabels = { auto: "Auto", light: "Light", dark: "Dark" };
var applyTheme = (pref) => {
  document.documentElement.style.colorScheme = pref === "auto" ? "light dark" : pref;
  qs("theme-toggle").innerHTML = \`\${themeIcons[pref]}<span>\${themeLabels[pref]}</span>\`;
  qs("theme-toggle").setAttribute("aria-label", \`Color theme: \${themeLabels[pref]}. Click to change.\`);
};
var themePref = themeOrder.includes(localStorage.getItem("cc-safety-net-theme")) ? localStorage.getItem("cc-safety-net-theme") : "auto";
applyTheme(themePref);
qs("theme-toggle").onclick = () => {
  themePref = themeOrder[(themeOrder.indexOf(themePref) + 1) % themeOrder.length] ?? "auto";
  if (themePref === "auto")
    localStorage.removeItem("cc-safety-net-theme");
  else
    localStorage.setItem("cc-safety-net-theme", themePref);
  applyTheme(themePref);
};
window.addEventListener("beforeunload", (event) => {
  if (!dirty)
    return;
  event.preventDefault();
  event.returnValue = "";
});
window.addEventListener("hashchange", applyView);
applyView();
Promise.all([loadIntegrations(), requestJson("/api/health")]).then(([, health]) => renderHealthStrip(health));
load().then((loaded) => {
  if (loaded)
    loadStarContext();
  activityFilters.days = Math.min(activityFilters.days, retentionDays());
  loadOverview();
  loadActivity();
}).catch((error) => {
  setAppStatus("Load failed", "error");
  setDetailStatus(String(error), "error");
});

  </script>
</body>
</html>
`;var Dd='<script id="ccsn-data" type="application/json">';function Ad(A){return Ed.replace(Dd,()=>Dd+JSON.stringify({token:A}).replaceAll("<","\\u003c"))}var Yr="kenryu42/cc-safety-net",Zy=`https://github.com/${Yr}`,Di=1e4,Xy=7,Qy="The project draft directory changed; reload the draft before applying.",eh="audit settings are user scope only; remove the audit section from a project proposal";async function Od(A,z={}){let X=xt({label:"gui",booleans:{noOpen:["--no-open"]}},A),ee=z.log??console.log,te=z.error??console.error;if(X.errors.length>0){for(let le of X.errors)te(le);return te("Usage: cc-safety-net gui [--no-open]"),1}let ae=await th(l,z);if(ee(`CC Safety Net policy GUI: ${ae.url}`),!X.flags.noOpen)try{await(z.openBrowser??ph)(ae.url)}catch(le){te(`Failed to open browser: ${le instanceof Error?le.message:String(le)}`),te(`Open this URL manually: ${ae.url}`)}if(z.keepAlive===!1)return await ae.close(),0;return await uh(ae),0}async function th(A,z={}){let X=Jy(24).toString("base64url"),ee={dir:null,revision:0},te=Ky((ye,he)=>{nh(A,ye,he,X,z,ee)});await new Promise((ye,he)=>{te.once("error",he),te.listen(0,"127.0.0.1",()=>{te.off("error",he),ye()})});let le=`http://127.0.0.1:${te.address().port}`;return{origin:le,token:X,url:`${le}/?token=${encodeURIComponent(X)}`,close:()=>dh(te)}}async function nh(A,z,X,ee,te,ae){let le=A(),ye=new URL(z.url??"/","http://127.0.0.1");if(z.method==="GET"&&ye.pathname==="/favicon.ico"){X.writeHead(204,{"cache-control":"no-store"}),X.end();return}if(!ah(z,ye,ee)){yt(X,403,{error:"Forbidden"});return}if(z.method==="GET"&&ye.pathname==="/"){ch(X,Ad(ee));return}if(z.method==="GET"&&ye.pathname==="/api/policy"){let he=Ac(le,te),ve=L(le,Pi(te));yt(X,200,{...he,configState:Ne(ve),...ve.policyScopes?{projectPolicy:{path:v(te.cwd??process.cwd()),weakenings:ve.policyScopes.weakenings}}:{},destructiveCommandRules:G,secretPatterns:Ke,version:wt(),preview:he.errors.length>0?null:Te(he.policy,le.env)});return}if(z.method==="POST"&&ye.pathname==="/api/policy/preview"){let he=await Wn(z);if(!he.ok){yt(X,he.status,{errors:[he.error]});return}let ve=_c(le,he.value);yt(X,ve.errors.length>0?400:200,ve);return}if(z.method==="POST"&&ye.pathname==="/api/policy/explain"){let he=await Wn(z);if(!he.ok){yt(X,he.status,{errors:[he.error]});return}let ve=he.value;if(ve===null||typeof ve.command!=="string"){yt(X,400,{errors:["command must be a string"]});return}let be=Bn(ve.policy,le.home);if(be.length>0){yt(X,400,{errors:be});return}yt(X,200,ih(le,ve.command,ve.policy,te));return}if(z.method==="POST"&&ye.pathname==="/api/policy"){let he=await Wn(z);if(!he.ok){yt(X,he.status,{errors:[he.error]});return}let ve=Vt(le,he.value,te);yt(X,ve.errors.length>0?400:200,ve);return}if(z.method==="POST"&&ye.pathname==="/api/reset"){yt(X,200,Vt(le,J,te));return}if(z.method==="POST"&&ye.pathname==="/api/repair"){yt(X,200,Tc(le,te));return}if(z.method==="POST"&&ye.pathname==="/api/policy/project/choose-directory"){let he=await(te.chooseDirectory??Ri)();if("path"in he)ae.dir=he.path,ae.revision+=1;yt(X,200,{cancelled:"cancelled"in he,..."error"in he?{error:he.error}:{}});return}if(z.method==="GET"&&ye.pathname==="/api/policy/project"){let he=Fd(ae,te),ve=_d(he,le.home),be=qn(le,te);yt(X,200,{path:v(he),revision:ae.revision,baseline:be.baseline,userPolicyDiagnostics:be.diagnostics,projection:ve.projection,projectionDiagnostics:ve.diagnostics,canPickDirectory:Si(process.platform,process.env)});return}if(z.method==="POST"&&ye.pathname==="/api/policy/project/diff"){let he=await Td(le,z,X,ae,te);if(!he)return;let ve=_d(he.dir,le.home),be=qn(le,te).baseline,Ie=Y(be,se(he.proposal,le.home).policy);yt(X,200,{rows:Fr(Y(be,ve.projection).policy,Ie.policy,!1),weakenings:Ie.weakenings,existingFileDiagnostics:ve.diagnostics});return}if(z.method==="POST"&&ye.pathname==="/api/policy/project/apply"){let he=await Td(le,z,X,ae,te);if(!he)return;let ve=oh(he.dir,he.proposal,le.home);yt(X,ve.errors.length>0?500:200,ve);return}if(z.method==="GET"&&ye.pathname==="/api/activity"){let he=Q(le,te),ve=sh(ye.searchParams.get("days"),he);if(ve===null){yt(X,400,{error:`days must be an integer between 1 and ${he}`});return}yt(X,200,Cd(le,ve,te.activityLogsDir));return}if(z.method==="POST"&&ye.pathname==="/api/rules/choose-directory"){yt(X,200,await Ri());return}if(z.method==="GET"&&ye.pathname==="/api/rules"){let he=K(le,Pi(te)),ve=new Map(he.rules.map((be)=>[be.name,be]));yt(X,200,{projectPath:te.cwd??process.cwd(),canPickDirectory:Si(process.platform,process.env),rulebooks:he.rulebooks.map((be)=>({source:be.source,spec:be.spec,name:be.name,version:be.version,rules:be.rules.flatMap((Ie)=>{let Xe=ve.get(Ie);if(!Xe)return[];return[{name:Xe.name,command:Xe.command,subcommand:Xe.subcommand,block_args:Xe.block_args,reason:Xe.reason}]})})),errors:he.errors,warnings:he.warnings});return}if(z.method==="GET"&&ye.pathname==="/api/star/context"){yt(X,200,await(te.fetchStarContext??(()=>vh(le,{logsDir:te.activityLogsDir})))());return}if(z.method==="POST"&&ye.pathname==="/api/star"){let he=await(te.starRepo??fh)();yt(X,200,he.ok?{ok:!0}:{ok:!1,fallbackUrl:Zy});return}if(z.method==="GET"&&ye.pathname==="/api/integrations"){yt(X,200,await(te.fetchIntegrations??(()=>mh(le)))());return}if(z.method==="GET"&&ye.pathname==="/api/health"){yt(X,200,await(te.fetchHealth??yh)());return}if(z.method==="POST"&&(ye.pathname==="/api/install"||ye.pathname==="/api/uninstall")){let he=await Wn(z);if(!he.ok){yt(X,he.status,{errors:[he.error]});return}let ve=he.value?.target;if(typeof ve!=="string"||!Mt.some((Ie)=>Ie.target===ve)){yt(X,400,{error:"unknown target"});return}let be=ye.pathname==="/api/install"?"install":"uninstall";yt(X,200,await(te.runIntegration??hh)(be,ve));return}yt(X,404,{error:"Not found"})}function Pi(A){return{...A,cwd:A.cwd??process.cwd()}}function Fd(A,z){return A.dir??z.cwd??process.cwd()}function _d(A,z){let X=v(A),ee=Wy(X)?cn(X):{value:void 0,errors:[]},te=se(ee.value,z);return{projection:te.policy,diagnostics:[...ee.errors,...te.diagnostics]}}async function Td(A,z,X,ee,te){let ae=Fd(ee,te),le=ee.revision,ye=await Wn(z);if(!ye.ok)return yt(X,ye.status,{errors:[ye.error]}),null;let he=ye.value;if(typeof he?.revision!=="number")return yt(X,400,{errors:["revision must be a number"]}),null;if(he.revision!==le)return yt(X,409,{errors:[Qy]}),null;let ve=rh(he.proposal,A.home);if(ve.length>0)return yt(X,400,{errors:ve}),null;return{dir:ae,proposal:he.proposal}}function rh(A,z){let X=Bn(A,z);if(X.length>0)return X;return A?.audit===void 0?[]:[eh]}function oh(A,z,X){let ee=v(A),te=jr(z,x(z,X));try{return g(i(w(A,"project policy"),ee),`${JSON.stringify(te,null,2)}
`),{path:ee,errors:[]}}catch(ae){return{path:ee,errors:[ae instanceof Error?ae.message:String(ae)]}}}function ih(A,z,X,ee){let te=x(X,A.home),ae=L(A,Pi(ee)),le=Le({rules:ae.policy.rules,transparentWrappers:ae.policy.transparentWrappers,safety:Oe(te.safety),worktreeMode:te.workflow.worktree_mode,destructiveCommandProtectionEnabled:te.destructive_command_protection.enabled,destructiveCommandRuleOverrides:te.destructive_command_protection.overrides,destructiveCommandAllowPaths:te.destructive_command_protection.allow_paths,secretProtection:{enabled:te.secret_protection.enabled,disabledRules:De(te.secret_protection.overrides),denyPaths:te.secret_protection.deny_paths,allowPaths:te.secret_protection.allow_paths}});return jn(z,{policySnapshot:le,cwd:ee.cwd,userConfigDir:ee.userConfigDir},A)}function sh(A,z){if(A===null)return Math.min(Xy,z);let X=Number(A);if(!Number.isInteger(X)||X<1||X>z)return null;return X}function ah(A,z,X){if(z.searchParams.get("token")!==X)return!1;if(A.method!=="POST")return!0;return A.headers["x-cc-safety-net-token"]===X}var lh=1048576;async function Wn(A){let z=[],X=0;for await(let ee of A){let te=ee;if(X+=te.byteLength,X>lh)return{ok:!1,status:413,error:"Request body is too large"};z.push(te)}try{return{ok:!0,value:JSON.parse(Buffer.concat(z).toString("utf-8")||"{}")}}catch(ee){return{ok:!1,status:400,error:`Invalid JSON: ${ee instanceof Error?ee.message:String(ee)}`}}}function ch(A,z){A.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),A.end(z)}function yt(A,z,X){A.writeHead(z,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),A.end(JSON.stringify(X))}function dh(A){return new Promise((z,X)=>{A.close((ee)=>ee?X(ee):z())})}function uh(A){return new Promise((z)=>{let X=()=>{process.off("SIGINT",ee),process.off("SIGTERM",ee)},ee=()=>{X(),A.close().then(z)};process.once("SIGINT",ee),process.once("SIGTERM",ee)})}function ph(A){let z=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",X=process.platform==="win32"?["/c","start","",A]:[A];return new Promise((ee,te)=>{let ae=Id(z,X,{detached:!0,stdio:"ignore"}),le=(he)=>{ae.off("spawn",ye),te(he)},ye=()=>{ae.off("error",le),ae.unref(),ee()};ae.once("error",le),ae.once("spawn",ye)})}async function fh(A="gh",z=Di){return{ok:await Ei(A,["api","-X","PUT",`/user/starred/${Yr}`],z)===0}}async function mh(A,z={}){let X=await ir(z.fetcher),ee=gh(A,X);return{targets:Tt.map((te)=>{let ae=ee.find((le)=>le.platform===te.id);return{target:te.id,label:bt(te.id),version:X.versions[te.id]??null,status:ae?.configured?"active":ae?.detected?"disabled":ae?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:X.version,nodeVersion:X.nodeVersion,platform:X.platform}}}function gh(A,z){return bn(A,process.cwd(),{ampPluginListOutput:z.ampPluginListOutput,codexPluginListOutput:z.codexPluginListOutput,copilotCliVersion:z.versions["copilot-cli"]})}async function yh(A={}){let z=await(A.checkUpdates??Wt)();return{update:{latestVersion:z.latestVersion??null,updateAvailable:z.updateAvailable}}}var $d=Promise.resolve();function hh(A,z,X={}){let ee=async()=>{let ae=[],{log:le,error:ye}=console;console.log=(...he)=>ae.push(he.map(String).join(" ")),console.error=console.log;try{return{ok:await Gn(A,[],{selectTargets:async()=>[z],output:new Yy({write(ve,be,Ie){ae.push(String(ve).replace(/\n$/,"")),Ie()}}),...X})===0,output:ae.join(`
`)}}finally{console.log=le,console.error=ye}},te=$d.then(ee);return $d=te.then(()=>{return},()=>{return}),te}async function vh(A,z={}){let[X,ee,te]=await Promise.all([bh(z.command),Lh(z.fetchRepo),Promise.resolve(er(A,Q(A),z.logsDir).totalBlocked)]);return{starred:X,starCount:ee,blockedTotal:te}}async function bh(A="gh",z=Di){if(await Ei(A,["auth","status"],z)!==0)return null;let X=await Ei(A,["api",`/user/starred/${Yr}`],z);if(X===0)return!0;if(X===null)return null;return!1}function Ei(A,z,X){return new Promise((ee)=>{let te=Id(A,z,{stdio:"ignore",windowsHide:!0}),ae=!1,le,ye=(he)=>{if(ae)return;if(ae=!0,le)clearTimeout(le);ee(he)};te.once("error",()=>ye(null)),te.once("close",ye),le=setTimeout(()=>{te.kill(),ye(null)},X)})}async function Lh(A=fetch){try{let z=await A(`https://api.github.com/repos/${Yr}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(Di)});if(!z.ok)return null;let X=await z.json();return typeof X.stargazers_count==="number"?X.stargazers_count:null}catch{return null}}function wh(A){if(A[0]!=="help")return!1;let z=A[1];if(!z)Xo(),process.exit(0);if(Nn(z))process.exit(0);console.error(`Unknown command: ${z}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var kh={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),Nn("hook",console.error),process.exit(1)},install:async(A)=>{process.exit(await Gn("install",A))},update:async(A)=>{process.exit(await fi(A))},uninstall:async(A)=>{process.exit(await Gn("uninstall",A))},rule:async(A)=>{process.exit(await wd(l(),A))},policy:async(A)=>{process.exit(await Fc(l(),A))},status:async(A)=>{if(Ht(xt({label:"status"},A).errors))process.exit(1);xd(l())},statusline:async(A)=>{let z=xt({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},A);if(z.errors.length===0&&z.flags.claudeCode){await Ci(l());return}if(Ht(z.errors),!z.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");Nn("statusline",console.error),process.exit(1)},doctor:async(A)=>{let z=qo(A);if(!z)process.exit(1);let X=await ll(l(),{json:z.json,skipUpdateCheck:z.skipUpdateCheck});process.exit(X)},logs:async(A)=>{process.exit(await ji(l(),A))},gui:async(A)=>{process.exit(await Od(A))},explain:async(A)=>{process.exit(await bl(l(),A))}};async function xh(A){let z=xt({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},A);if(wh(A))return;let X=A[0],ee=X?Qn(X):void 0;if(z.help&&ee&&ee.name!=="rule")Nn(ee.name),process.exit(0);if(!X||z.help&&!ee)Xo(),process.exit(0);if(z.flags.version)kl(),process.exit(0);if(ee){await kh[ee.name](A.slice(1));return}if(X==="--statusline"){await Ci(l());return}console.error(X.startsWith("-")?`Unknown option: ${X}`:`Unknown command: ${X}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{xh as runCli};
