/* ====================================================================
   RevUP Intake — Question Definitions (v3 — business growth frame)
   77 questions across 7 sections. Each question has:
     - id, section, subsection
     - type (text|url|textarea|textarea-large|textarea-huge|radio|checkbox|subfields|repeating-offer)
     - label (the question)
     - hint (optional sub-line)
     - why (margin "why we ask" microcopy — specific to this question)
     - options, subfields, or perOfferFields where relevant
   ==================================================================== */

const SECTIONS = [
  {
    id: 'A',
    title: 'The Business',
    subtitle: "What you sell, who carries it, what it costs, what shape it's in.",
    why: "Every number and term here shapes everything we do for you across letters, ads, emails, positioning. The clearer we read the business as a whole, the sharper any single piece of marketing lands.",
    timeEst: '~12 min',
    questionCount: 15,
  },
  {
    id: 'B',
    title: 'The Founder & Spokesperson',
    subtitle: 'Who is on the other end — honestly.',
    why: 'Your audience reads the signal long before they read your words. We need a real read of who you are, what you do well, where you flow, and where you brace.',
    timeEst: '~15 min',
    questionCount: 20,
  },
  {
    id: 'C',
    title: 'The Audience',
    subtitle: 'Their world, their voice, their fears, what they need to believe.',
    why: 'Generic demographics will not cut it. We need their internal voice — what they actually say, what they actually fear, what belief is keeping them from buying even from the right person at the right time.',
    timeEst: '~28 min',
    questionCount: 22,
  },
  {
    id: 'D',
    title: 'Where the business is right now',
    subtitle: "What's on your mind, what you want, what you keep dodging.",
    why: "You hired us to diagnose, not to take orders. These three questions surface the data we'll diagnose against. Where they agree, the picture is clear; where they diverge, that's usually where the real leverage lives.",
    timeEst: '~5 min',
    questionCount: 3,
  },
  {
    id: 'E',
    title: 'Proof Inventory',
    subtitle: 'What you can defensibly show.',
    why: 'Proof without mechanism is weak. Mechanism without proof is hollow. We need both, and we need them real. Fake proof collapses trust permanently.',
    timeEst: '~15 min',
    questionCount: 7,
  },
  {
    id: 'F',
    title: 'Market, Competitors, Timing',
    subtitle: 'The world the work lands in.',
    why: 'Marketing has to land in the real world the reader is living in — not a vacuum. We need the surrounding context to calibrate angle and urgency.',
    timeEst: '~10 min',
    questionCount: 6,
  },
  {
    id: 'G',
    title: 'Constraints & Boundaries',
    subtitle: 'The rules that protect the work.',
    why: 'The work has to live within your rules — legal, brand, personal. Tell us now, not after the draft.',
    timeEst: '~5 min',
    questionCount: 4,
  },
];

const QUESTIONS = [
  // ============== SECTION A — The Business ==============
  // A1. Business snapshot
  { id:'q1', section:'A', subsection:'A1. Business snapshot', type:'text',
    label:'Company or brand name.',
    why:"Anchors letterhead, by-line, and any references in copy." },
  { id:'q2', section:'A', subsection:'A1. Business snapshot', type:'url',
    label:'Website URL.',
    hint:"So we can read the room before we make anything — your existing tone, positioning, and what your audience already sees.",
    why:"We read your site before writing. Your existing voice, the way you treat current readers, the positioning you have already done — all of that should match whatever we make next." },
  { id:'q3', section:'A', subsection:'A1. Business snapshot', type:'textarea',
    label:'What you sell, in one sentence, in your own words.',
    why:"If you cannot describe it in one sentence, we cannot either. This sentence is also a diagnostic — sometimes the work begins by getting it right." },

  // A2. Offer landscape — multi-offer block
  { id:'q4', section:'A', subsection:'A2. Your offer landscape', type:'repeating-offer',
    label:'List your offers — at least one, add as many as apply.',
    hint:"Tap 'Add another offer' to capture more. We're after the shape of your business as a whole, not just one sales letter target.",
    why:"Most intakes ask about one offer. We ask about all of them because most marketing decisions only make sense in the context of your full ladder. Single-offer dependence is a structural fact about the business; offer-ladder depth is another. We read both, and any single piece of marketing gets sharper when we can see the catalogue around it.",
    minimum: 1,
    perOfferFields: [
      { id:'name',     label:'Offer name',                              type:'text' },
      { id:'price',    label:'Price + payment terms',                   type:'text',     placeholder:'e.g. $1,997 one-time, or $97/mo' },
      { id:'position', label:'Where this sits in your offer ladder',    type:'radio',    options:[
          { value:'front-end',   title:'Front-end',          desc:'Entry offer — first thing a stranger buys.' },
          { value:'core',        title:'Core',               desc:'Main offer — what most clients buy.' },
          { value:'upsell',      title:'Upsell',             desc:'Higher-tier after the initial purchase.' },
          { value:'order-bump',  title:'Order bump',         desc:'Small add-on at checkout.' },
          { value:'downsell',    title:'Downsell',           desc:'Lower-tier offered if main is declined.' },
          { value:'continuity',  title:'Continuity',         desc:'Subscription, membership, recurring.' },
          { value:'back-end',    title:'Back-end',           desc:'High-ticket offered to existing clients.' },
          { value:'one-off',     title:'One-off / standalone', desc:"Doesn't sit in a funnel structure." },
          { value:'not-sure',    title:'Not sure',           desc:'We can sort this on the call.' },
      ]},
      { id:'format',   label:'Delivery format',                         type:'text',     placeholder:'Course, coaching, software, physical, service, hybrid' },
      { id:'included', label:"What's included",                         type:'textarea', hint:"Main product, support, community, delivery mechanics." },
      { id:'bonuses',  label:'Bonuses or order bumps tied to this',     type:'textarea', hint:"Skip if none. If yes, give honest standalone value for each — inflated retail values collapse trust the moment a reader does the math." },
      { id:'delivery', label:'How is it delivered?',                    type:'radio',    options:[
          { value:'my-time',   title:'Requires my direct time' },
          { value:'team',      title:'Team delivers' },
          { value:'automated', title:'Mostly automated' },
          { value:'mixed',     title:'Mixed' },
      ]},
      { id:'duration', label:'Access duration / how long it runs',      type:'text',     placeholder:'Lifetime / 12 months / cohort / subscription' },
      { id:'age',      label:'How long has this offer been live?',      type:'text',     placeholder:'e.g. 2 years, just launched, planning to launch' },
    ],
  },

  // A3. Guarantee
  { id:'q11', section:'A', subsection:'A3. The guarantee', type:'textarea',
    label:"What's your guarantee?",
    hint:"30-day money-back, conditional refund, no-questions-asked, performance-based, or no guarantee.",
    why:"The guarantee carries the close. Buyers feel the difference between one you fully stand behind and one engineered for conversion — and the second produces refund spikes within weeks. We need the real shape, not the marketing version." },
  { id:'q12', section:'A', subsection:'A3. The guarantee', type:'textarea',
    label:'What is the actual refund process?',
    hint:"How does a buyer claim it? How long does it take? Who handles it?",
    why:"Operationally clean guarantees defuse skepticism. If a buyer cannot picture the refund process, they suspect there is a catch — and that suspicion shows up in conversion." },
  { id:'q13', section:'A', subsection:'A3. The guarantee', type:'textarea',
    label:'Any conditions attached?',
    hint:"If yes, list them plainly. We never hide conditions in fine print.",
    why:"Hidden conditions in fine print produce post-purchase discovery — and that produces refund spikes, bad reviews, and chargebacks. Naming conditions up front lets the right buyers self-select in cleanly." },
  { id:'q14', section:'A', subsection:'A3. The guarantee', type:'textarea',
    label:'Are you genuinely comfortable honoring this guarantee if someone asks?',
    hint:"If the honest answer is 'we hope they don't,' we'll need to rework the guarantee before writing.",
    why:"Hard checkpoint. Guarantees you don't fully stand behind generate refund waves once buyers feel the dissonance — the math hurts the business as much as it hurts the buyer. We'd rather catch this now than write copy on top of it." },

  // A4. Business metrics
  { id:'q15', section:'A', subsection:'A4. Business metrics', type:'subfields',
    label:"What business metrics do you track? Fill what you have, skip what you don't.",
    subfields: [
      { id:'lead-volume',     label:'Lead volume',                                                placeholder:'e.g. 50 qualified leads/month, or "not tracked"' },
      { id:'biz-conversion',  label:'Biz-level close rate (conversations → paying clients)',     placeholder:'e.g. 1 in 5, 20%, or "not tracked"' },
      { id:'page-conversion', label:'Page-level conversion (any specific page worth optimising)', placeholder:'e.g. 1.2%, "not relevant", or "not tracked"' },
      { id:'transaction-value', label:'Average deal size at first sale',                          placeholder:'e.g. $1,500, or "varies — most ~$X"' },
      { id:'cac',             label:'Cost per acquisition (time + money)',                       placeholder:'e.g. $200, or "mostly time, hard to estimate"' },
      { id:'top-channel',     label:'Main lead source + roughly what % of leads/revenue',        placeholder:'e.g. LinkedIn ~70%, referrals ~20%, paid ~10%' },
      { id:'list',            label:'Email list size + rough engagement',                        placeholder:'e.g. 4,000 list, 30% open rate, or no list yet' },
    ],
    why:"We don't need precision; we need shape. If most of these are 'not tracked,' that's not a problem — it just means instrumentation comes before optimisation. Guessing at numbers we then recommend against produces copy that's structurally soft." },

  // A5. Growth phase & capacity
  { id:'q16', section:'A', subsection:'A5. Growth phase & capacity', type:'radio',
    label:'Which growth phase are you in right now?',
    options: [
      { value:'early', title:'Early', desc:'Just launched / still finding the audience.' },
      { value:'scaling', title:'Scaling', desc:'Have a working model, pushing volume.' },
      { value:'mature', title:'Mature', desc:'Established, optimising.' },
      { value:'pivoting', title:'Pivoting', desc:'Changing direction.' },
    ],
    why:"Growth phase shapes which awareness level we target. Early stages target the warmest audience for fastest ROI. Scaling stages can afford colder, larger audiences. Mature can go anywhere." },
  { id:'q17', section:'A', subsection:'A5. Growth phase & capacity', type:'subfields',
    label:'Capacity to deploy whatever we make.',
    subfields: [
      { id:'budget', label:'Budget for traffic / paid amplification', placeholder:'e.g. $5k/mo, organic only, etc.' },
      { id:'team', label:'Team bandwidth (who executes once it ships)', placeholder:'e.g. solo founder, 2-person team, agency-supported' },
      { id:'duration', label:'How long do you need this to perform', placeholder:'one-time push / evergreen / seasonal' },
    ],
    why:"Capacity has to match the ambition. Cold-traffic Unaware-target work with a Most-Aware-sized budget will ship but not perform. We size the bet to what you can actually run." },

  // A6. Timeline
  { id:'q18', section:'A', subsection:'A6. Timeline', type:'textarea',
    label:'When do you need this work live?',
    hint:"And is there a real external reason driving that date — launch event, cohort start, seasonal window — or is it flexible?",
    why:"Timeline shapes how deep we can go on positioning work upstream. A 2-week deadline closes off some moves a 2-month deadline opens up." },

  // A7. Business diagnostic (Rev11 inputs)
  { id:'q-rev11-1', section:'A', subsection:'A7. Business diagnostic', type:'textarea',
    label:'Of your last 20 or so clients, roughly how many actively referred someone to you?',
    hint:"Best estimate is fine. If you don't track this, that's a valid answer.",
    why:"Referrals are unsentimental data on whether your delivery generates organic word-of-mouth. We don't need precision — a rough sense is enough to read the pattern. If the number is low or unknown, that's the diagnostic itself." },
  { id:'q-rev11-2', section:'A', subsection:'A7. Business diagnostic', type:'textarea',
    label:'What is the average total revenue per client across the whole relationship — not just first sale?',
    hint:"If a client buys once and leaves: that's the number. If they upgrade or buy again: rough total. If you don't track this, say so.",
    why:"This shapes pricing posture, offer architecture, and what kind of close fits. If the number isn't tracked yet, that's its own answer — instrumentation usually comes before optimisation. Guesswork compounds into bad recommendations downstream." },
  { id:'q-rev11-3', section:'A', subsection:'A7. Business diagnostic', type:'textarea',
    label:'If you took a full month off starting tomorrow, what would break first — and what would still work?',
    hint:"Real answer, not the aspirational one. We're not judging — we just need to see what depends on you personally.",
    why:"How much of the business runs on documented systems vs your direct presence shapes what we can promise about a buyer's experience. Affects delivery copy, scaling claims, and which marketing moves are honest at your current capacity." },

  // ============== SECTION B — Founder & Spokesperson ==============
  // B1. About you
  { id:'q19', section:'B', subsection:'B1. About you', type:'text',
    label:'Who is the spokesperson?',
    hint:"You / a partner / a named expert.",
    why:"The spokesperson's voice shapes every paragraph. Founder-voice and brand-voice render very differently." },
  { id:'q20', section:'B', subsection:'B1. About you', type:'text',
    label:'Name + title or credentials.',
    why:"The by-line and authority framing come from this. Real credentials only — implied authority breaks the work." },

  // B2. Genuine craft
  { id:'q21', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:'What do you actually do, day-to-day, when working with clients or customers?',
    hint:"Describe your real process — not the marketing version.",
    why:"The mechanism behind your work is the most credible thing we can show. How the sausage is made — calmly, specifically, real — converts harder than any clever angle." },
  { id:'q22', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:"What's the thing you're genuinely great at — the thing you'd still do even if you weren't paid?",
    why:"This is where your voice lives. What you'd do unpaid is the signal your audience picks up before they read a word. We work with that signal — it can't be manufactured." },
  { id:'q-flow-1', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:'What gets you into flow when working — the specific moments where time disappears?',
    hint:"Specific scenes, not abstract qualities. The kind of work where you'd lose track of time even if no one was paying you.",
    why:"Most diagnostics ask what's wrong; we also ask what's already working. The shape of your flow tells us what kind of business model fits — and which marketing moves will feel like a relief instead of a tax." },
  { id:'q-flow-2', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:"What in your current business drains you that you suspect shouldn't?",
    hint:"Specific edges where you brace against the work.",
    why:"Where you brace, the audience feels it. Friction in the operator becomes friction in the marketing. We map both sides — what to amplify, what to redesign." },
  { id:'q23', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:"What's your non-negotiable standard?",
    hint:"Something you'd sacrifice anything to deliver. If a project required violating this, you'd walk. What is it?",
    why:"The standards you refuse to drop become the criteria the market uses to evaluate your category. Sovereignty over compromise — and it compounds, because consistent standards build a moat over time." },
  { id:'q24', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:'What do you genuinely refuse to do in this work — even when a client asks or a competitor does it?',
    why:"Honest polarisation comes from real refusals. Invented villains break the work — readers detect manufactured enemies fast and trust collapses. Real refusals do the opposite; they signal you have a position worth holding." },

  // B3. Origin + mission
  { id:'q25', section:'B', subsection:'B3. Origin + mission', type:'textarea-large',
    label:'How did you end up doing this work?',
    hint:"Real story, not the LinkedIn version.",
    why:"The origin story is the identification bridge. Readers who feel they recognise themselves in your origin become the ones who buy and stay." },
  { id:'q26', section:'B', subsection:'B3. Origin + mission', type:'textarea',
    label:"If you've personally lived the problem your product solves, tell us.",
    why:"Lived experience is irreplaceable credibility. If you have it, the marketing leans on it. If you don't, we work with what is real instead." },
  { id:'q27', section:'B', subsection:'B3. Origin + mission', type:'textarea',
    label:'Why this mission now?',
    hint:"Honest answer. Even if 'I need to pay the bills' is part of it, say so. We render it cleanly.",
    why:"Fabricated altruism is detectable. Real mission — even if it includes wanting to make a living — reads as honest. We never fake purpose." },

  // B4. Track record
  { id:'q28', section:'B', subsection:'B4. Your track record', type:'textarea',
    label:'Specific things you have built, delivered, predicted, or produced that worked.',
    why:"This is the proof reservoir we draw from for credibility moments. Specifics convert. Vague claims do not." },
  { id:'q29', section:'B', subsection:'B4. Your track record', type:'textarea',
    label:'Credentials that are real and verifiable.',
    hint:"Degrees, certifications, published work, named media, documented results.",
    why:"Real authority only. We never imply credentials adjacent to ones the spokesperson actually holds. That's a hard line." },
  { id:'q30', section:'B', subsection:'B4. Your track record', type:'textarea',
    label:'Anything a buyer can check on their own.',
    hint:"Public case studies, named testimonials, verifiable data.",
    why:"Asymmetric honesty — pointing readers to verification they can do themselves — is a powerful trust marker. We use it whenever it's available." },

  // B5. Voice & personality
  { id:'q31', section:'B', subsection:'B5. Your voice & personality', type:'textarea',
    label:"Describe how you talk when you're off-script.",
    hint:"With friends, on a podcast, in Slack.",
    why:"This calibrates the voice rendering downstream. Off-script is how you actually sound — that's what we render." },
  { id:'q32', section:'B', subsection:'B5. Your voice & personality', type:'textarea',
    label:'Three to five words or phrases you use often — or refuse to use.',
    why:"Vocabulary is voice fingerprint. The words you reach for and the ones you reject define how the work sounds." },
  { id:'q33', section:'B', subsection:'B5. Your voice & personality', type:'textarea',
    label:'Do you want the marketing to sound like you, or like a polished brand voice?',
    hint:"There is no wrong answer.",
    why:"Two different voice renders. Founder-voice is more intimate, less polished, often more persuasive. Brand-voice is cleaner but less differentiating. Your call." },
  { id:'q34', section:'B', subsection:'B5. Your voice & personality', type:'textarea',
    label:'Any writers, podcasters, or speakers whose voice feels close to how you would want this work to sound?',
    why:"Reference voices help us calibrate fast. Naming three writers you respect tells us more than ten paragraphs of voice description." },

  // B6. Warm-exit posture
  { id:'q35', section:'B', subsection:'B6. Warm-exit posture (critical)', type:'textarea',
    label:'Are you genuinely okay with the right readers filtering themselves out after reading?',
    hint:"This is not a trick question. If your honest answer is 'I want everyone who reads it to buy,' we will discuss before writing.",
    why:"Hard checkpoint. Marketing that tries to convert everyone produces post-purchase dissonance in the misfits — they refund, leave bad reviews, and tell their network. Filtering honestly costs short-term volume but compounds reputation. If that trade isn't acceptable, we work on the offer or audience first, not the copy." },

  // B7. The delivery experience (replaces old Q8)
  { id:'q-delivery', section:'B', subsection:'B7. The delivery experience', type:'textarea-large',
    label:'Walk us through what working with you actually looks like for the buyer — first week, first month, first quarter.',
    hint:"And what about delivering it do you genuinely enjoy? Both sides matter.",
    why:"This gives us delivery clay for any marketing surface — onboarding emails, retention copy, case-study angles, even how the close gets framed. The 'what you enjoy' half tells us where your voice rings truest in the work." },

  // ============== SECTION C — The Audience ==============
  // C1. Best-fit clients
  { id:'q36', section:'C', subsection:'C1. Best-fit clients', type:'textarea-large',
    label:'Describe your single best client or customer so far.',
    hint:"Not a statistic — a specific person. Their situation, how they found you, what changed for them, why they thrived. (Use initials or a persona if names are sensitive.)",
    why:"One specific best-client story tells us more about who the marketing is for than ten persona docs. Specifics drive identification." },
  { id:'q37', section:'C', subsection:'C1. Best-fit clients', type:'textarea',
    label:'What kind of person becomes your best client pattern?',
    hint:"Identity-level — not just 'small business owner' but what makes them this kind of small business owner.",
    why:"Identity-anchored audiences pattern-match. Demographic-anchored audiences scroll past. We aim for the identity, not the bracket." },
  { id:'q38', section:'C', subsection:'C1. Best-fit clients', type:'textarea',
    label:'Who is this work NOT for?',
    hint:"Honest answer. Who should filter themselves out?",
    why:"Marketing that filters honestly outperforms marketing that tries to convert everyone. Knowing who not to write to sharpens who we write to." },

  // C2. How they talk
  { id:'q39', section:'C', subsection:'C2. How they talk', type:'textarea-huge',
    label:'Paste 3 to 10 direct quotes from real clients or prospects — things they said before, during, or after buying from you.',
    hint:"Emails, testimonials, DMs, transcripts. Verbatim. If they said 'I was drowning in this,' we need 'I was drowning' — not 'overwhelmed.'",
    why:"This is the single most important answer in the entire intake. The reader's actual language is what makes any marketing feel like it was written for them. We will not invent it. We need real words." },
  { id:'q40', section:'C', subsection:'C2. How they talk', type:'textarea',
    label:'What phrases do prospects use when they first describe their problem to you?',
    hint:"Paste 3 to 5 actual phrases.",
    why:"Opening language lives here. The first paragraph of any piece of marketing has to sound like the inside of the reader's head." },

  // C3. What they want
  { id:'q41', section:'C', subsection:'C3. What they want', type:'textarea-large',
    label:'What does the reader dream about achieving?',
    hint:"Be specific. Not 'success' but what success looks like in their life — the scene, the moment, the feeling.",
    why:"Vivid future-state visualisation is one of the strongest moves marketing can make. Generic dreams ('grow my business') are invisible. Specific scenes (Friday afternoon, kids home, no laptop open) convert." },
  { id:'q42', section:'C', subsection:'C3. What they want', type:'textarea',
    label:"What's the one thing they would pay almost anything to solve?",
    why:"This is the core desire we anchor the offer to. If we get this wrong, no amount of clever copy compensates." },

  // C4. What they fear
  { id:'q43', section:'C', subsection:'C4. What they fear', type:'textarea',
    label:'When a prospect first talks to you, what emotions come through?',
    hint:"Anxiety, shame, anger, exhaustion, hope, skepticism. Name what you actually hear.",
    why:"This calibrates the emotional state we meet the reader in. Pride-state readers need different opening moves than fear-state readers." },
  { id:'q44', section:'C', subsection:'C4. What they fear', type:'textarea-large',
    label:'What are they afraid of — specifically — and what are they afraid of admitting to others about it?',
    hint:"Not abstract fears. Real language. Examples: 'being found out as a fraud at work,' 'losing the house,' 'that my spouse will think I'm throwing money away again.'",
    why:"We name fears once, calmly, never amplified. The behavioural research is consistent: amplified fear produces hesitation, not action — and the hesitation gets blamed on the seller. Calm naming reads as understanding; that's what builds the bridge." },
  { id:'q45', section:'C', subsection:'C4. What they fear', type:'textarea',
    label:'What are they afraid will happen if they do not solve this?',
    why:"Cost of inaction. We name it once, calmly. Calm naming of a real cost is more persuasive than scare tactics — and the math backs it: high-cortisol buyers churn faster than they convert." },
  { id:'q46', section:'C', subsection:'C4. What they fear', type:'textarea',
    label:'What are they afraid will happen if they do try to solve this and it fails?',
    why:"Purchase anxiety lives here. Every objection at the close ('what if this is another disappointment') needs to be defused before it surfaces in the reader's head." },

  // C5. What they've tried
  { id:'q47', section:'C', subsection:"C5. What they've tried", type:'textarea',
    label:'What have they tried before your product or service that did not work?',
    why:"The reader's history of attempts shapes their sophistication level. Sophisticated audiences need different treatment than fresh ones." },
  { id:'q48', section:'C', subsection:"C5. What they've tried", type:'textarea',
    label:'Why did it not work?',
    hint:"From their point of view, not yours.",
    why:"This is where the belief-to-shift often hides. The story they tell about why everything failed before is the belief the marketing has to honour and reframe — not attack." },
  { id:'q49', section:'C', subsection:"C5. What they've tried", type:'textarea',
    label:'What do they now believe about solutions in your category because of those failures?',
    why:"This is usually the operating belief that blocks the buy. Honoured inside a larger frame, it dissolves; attacked head-on, it hardens. We never attack a belief — they came by it through real experience." },

  // C6. How they decide
  { id:'q50', section:'C', subsection:'C6. How they decide', type:'textarea',
    label:'When making a decision like this, do they mostly decide alone or do they consult others?',
    hint:"Best guess. 'They will ask their spouse / business partner / coach' vs 'they will make the call themselves.'",
    why:"Internal decision-makers respond to autonomy. External decision-makers respond to social proof. Any close has to match the audience's mode." },
  { id:'q51', section:'C', subsection:'C6. How they decide', type:'textarea',
    label:'What do they need to see or hear before they are comfortable buying?',
    hint:"Testimonials? Data? A call with you? A guarantee? A specific credential?",
    why:"This tells us which proof channels to lead with. Different audiences need different combinations." },

  // C7. After they buy
  { id:'q52', section:'C', subsection:'C7. After they buy', type:'textarea',
    label:'When clients or customers work with you, what is the pattern?',
    hint:"Most ghost after 30 days? Stay for a few months? Stick around for years? Become raving fans?",
    why:"This is our cleanest read on customer level mix. Magic-bullet seekers ghost. Committed improvers stick. Transformation seekers stay. The filter calibrates to which mix you actually want." },

  // C8. Traffic source
  { id:'q53', section:'C', subsection:'C8. How they arrive', type:'textarea',
    label:'How are people going to arrive at whatever we make? (or how do they arrive at you generally?)',
    hint:"Email list, paid ad on Facebook/Google, organic search, referral, podcast ad, retargeting, cold outbound, etc. If you do not know yet, tell us what you are considering.",
    why:"Traffic source informs the awareness-level mix likely in the read. We use this plus growth phase plus capacity to lock the strategic targeting decision." },

  // C9. Belief and emotional state (migrated from old Section D, universalised)
  { id:'q54', section:'C', subsection:'C9. Belief and emotional state', type:'textarea-large',
    label:'What is the #1 thing your prospects currently believe that keeps them from buying — even from the right person at the right time?',
    hint:"Examples: 'I've tried stuff like this before and nothing works,' 'I don't have time,' 'This is too expensive,' 'I'm too far gone,' 'This is for other people, not me.' Be specific to your audience.",
    why:"This is the hardest question in the intake — and one of the most important. Most people can't answer cleanly on first pass. That's fine. Best guess gives us a foothold; we sharpen it together later." },
  { id:'q55', section:'C', subsection:'C9. Belief and emotional state', type:'textarea-large',
    label:'What do they need to believe instead for buying to feel like the obvious next step?',
    why:"The destination belief. This is what every piece of marketing — letter, email, ad, page — is engineered to install gently, through inclusion, never through attack." },
  { id:'q56', section:'C', subsection:'C9. Belief and emotional state', type:'textarea-large',
    label:'What is the piece of truth, evidence, story, or reframe that makes that belief-shift happen honestly?',
    hint:"Not a gimmick. What actually proves the new belief is true?",
    why:"Without real evidence, the shift can't be made honestly. If the only path to the new belief is hype, we have a structural problem upstream — and no amount of clever copy fixes it." },
  { id:'q57', section:'C', subsection:'C9. Belief and emotional state', type:'textarea',
    label:'When prospects first encounter your work — ad, post, referral mention, email — what emotional state are they typically in?',
    hint:"Urgent anxiety? Quiet dread? Defiant hope? Numb exhaustion? Something pushed them to be there. Name the feeling.",
    why:"Marketing has to meet readers in whatever state they actually arrive in — not the abstract emotional baseline, the specific one driving the moment of attention." },

  // ============== SECTION D — Where the business is right now ==============
  { id:'q-attention', section:'D', subsection:'D1. The current picture', type:'textarea-large',
    label:"What's taking up most of your attention in the business right now?",
    hint:"Whatever's loudest in your head when you sit down to work. Not what you think we want to hear — what's actually there.",
    why:"This is your stated focus. We compare it against the next two questions to triangulate. Sometimes what takes our attention is the actual issue; sometimes it's the surface of something underneath. Both are useful." },
  { id:'q-magic-wand', section:'D', subsection:'D1. The current picture', type:'textarea',
    label:'If a magic wand fixed one thing about your business overnight, what would you wave it at?',
    hint:"Doesn't have to be realistic. The thing that, if it just disappeared or just appeared, would change everything.",
    why:"This is your desired outcome. Often different from your stated focus — and the gap is diagnostic." },
  { id:'q-avoidance', section:'D', subsection:'D1. The current picture', type:'textarea',
    label:"What have you been telling yourself you should fix, but keep deprioritising?",
    hint:"The thing on the back-burner that's been there longer than it should be.",
    why:"This is your avoidance. Where it overlaps with the first two, the issue is clear and the question is execution. Where it diverges, that's usually where the real diagnostic work is — and where most of the leverage lives." },

  // ============== SECTION E — Proof Inventory ==============
  // E1. Testimonials
  { id:'q58', section:'E', subsection:'E1. Testimonials', type:'textarea-huge',
    label:'Paste every named, attributed testimonial you have permission to use.',
    hint:"Name, context, outcome, quote. If you only have anonymous ones, note that.",
    why:"Real, named, attributed testimonials are the most credible proof we can deploy. Anonymous testimonials cannot do the same work — they lower trust rather than raise it." },
  { id:'q59', section:'E', subsection:'E1. Testimonials', type:'textarea',
    label:'Any video or audio testimonials?',
    hint:"Drop links.",
    why:"Multi-channel proof. Some readers process visually or auditorily and skim past written testimonials entirely. Video and audio reach them." },

  // E2. Case studies
  { id:'q60', section:'E', subsection:'E2. Case studies', type:'textarea-huge',
    label:'Share 3 to 5 specific before-and-after stories.',
    hint:"Real people, real situation before, real outcome after, specifics (time, numbers, quotes). The more specific, the more load-bearing.",
    why:"Case studies demonstrate the mechanism working. Testimonials establish credibility. We need both — they do different jobs." },

  // E3. Mechanism
  { id:'q61', section:'E', subsection:'E3. Your mechanism', type:'textarea-large',
    label:'What is your actual method, process, system, or framework?',
    hint:"Describe it like you would describe it to a colleague. The steps, the parts, the reason it works.",
    why:"This is the load-bearing question for proof. Without a visible mechanism, the offer reads as 'just trust me.' With one, it reads as 'here is how this works, see for yourself.'" },
  { id:'q62', section:'E', subsection:'E3. Your mechanism', type:'textarea',
    label:'What about your method is different from how others do this?',
    why:"Differentiation. The wedge that makes you not-replaceable. We thread this through every credibility moment." },

  // E4. Documentation
  { id:'q63', section:'E', subsection:'E4. Documentation & data', type:'textarea',
    label:'Any real numbers, metrics, or stats that back your claims?',
    hint:"Aggregate results, study findings, published data, independent research, industry benchmarks.",
    why:"Specific numbers — defensible ones — make claims feel anchored. Vague claims feel manufactured." },

  // E5. Channels of proof
  { id:'q64', section:'E', subsection:'E5. Channels of proof', type:'checkbox',
    label:'Which of these can you actually show?',
    hint:"Tick all that apply.",
    options: [
      { value:'written-testimonials', title:'Written testimonials with real names + faces' },
      { value:'video-testimonials', title:'Video testimonials' },
      { value:'audio-testimonials', title:'Audio / podcast mentions' },
      { value:'screenshots', title:'Screenshots / data dashboards' },
      { value:'demo', title:'Live demo / walkthrough' },
      { value:'tool', title:'Free diagnostic / tool the reader can try' },
      { value:'bts', title:'Behind-the-scenes footage of your process' },
    ],
    why:"Multi-channel proof prevents leakage. Readers process differently. Marketing that proves itself only in writing loses readers who process visually or kinesthetically." },

  // ============== SECTION F — Market, Competitors, Timing ==============
  // F1. Competitors
  { id:'q65', section:'F', subsection:'F1. Competitors', type:'textarea',
    label:'Name 3 to 5 real competitors or alternatives the reader is considering.',
    why:"We need to know who you are positioned against. Differentiation requires real points of comparison." },
  { id:'q66', section:'F', subsection:'F1. Competitors', type:'textarea-large',
    label:'For each competitor: what do they promise, at what price, with what weaknesses?',
    why:"This is the differentiation map. We do not attack competitors — but we honestly distinguish what your offer does that theirs cannot or will not." },

  // F2. Market context
  { id:'q67', section:'F', subsection:'F2. Market context', type:'textarea',
    label:'Anything happening in the world, the industry, or the culture right now that makes this work especially relevant?',
    hint:"Economic conditions, AI disruption, regulatory change, cultural shift, news cycle.",
    why:"Topical themes give marketing real traction when the connection is genuine. We don't manufacture relevance — readers detect it instantly and credibility erodes faster than topical urgency could ever build." },
  { id:'q68', section:'F', subsection:'F2. Market context', type:'textarea',
    label:'Any real, documentable systemic forces working against your reader that we should honestly name?',
    hint:"Not invented villains — genuine ones they already suspect.",
    why:"Real enemies, honestly named, sharpen positioning. Invented villains break the work immediately. We will only name what is genuinely real." },

  // F3. Timing & scarcity
  { id:'q69', section:'F', subsection:'F3. Timing & scarcity', type:'textarea',
    label:'Is there a REAL deadline tied to this offer?',
    hint:"Cohort close, inventory cap, price-increase date, seasonal window, event tied to the offer.",
    why:"Any urgency we write traces to a real deadline. Manufactured urgency produces a short conversion spike followed by elevated refunds and reduced repeat business — the math doesn't work even before the trust cost. Real deadlines compound trust; fake ones decay it." },
  { id:'q70', section:'F', subsection:'F3. Timing & scarcity', type:'textarea',
    label:'Is there a REAL cap on how many people can join?',
    hint:"And what happens when the cap is reached? If no real cap, that is fine — we do not invent scarcity.",
    why:"Same logic as deadlines. Real caps get named honestly; manufactured 'only 3 left' produces buyer regret, refunds, and brand erosion within months. We just want to know which one you have." },

  // ============== SECTION G — Constraints & Boundaries ==============
  { id:'q71', section:'G', subsection:'G. Constraints & boundaries', type:'textarea',
    label:'Words, phrases, or claims you WILL NOT say.',
    hint:"Regardless of whether they would convert.",
    why:"Hard rendering boundary. Knowing your absolute no-go words saves rewrites later." },
  { id:'q72', section:'G', subsection:'G. Constraints & boundaries', type:'textarea',
    label:'Claims you cannot legally make.',
    hint:"Regulatory restrictions, compliance requirements, medical / financial disclosures.",
    why:"Compliance. Especially load-bearing for health, finance, supplements, professional services. Tell us the regulatory landscape so we work within it from word one." },
  { id:'q73', section:'G', subsection:'G. Constraints & boundaries', type:'textarea',
    label:'Any competitors or specific people you cannot name publicly.',
    why:"Affects polarisation language. We never invent enemies, but we sometimes name real ones — only if it is safe and accurate to do so." },
  { id:'q74', section:'G', subsection:'G. Constraints & boundaries', type:'textarea',
    label:'Is there anything you want us to know that none of the above questions asked?',
    why:"Catch-all. The detail you almost did not mention is often the one that unlocks the angle. Drop anything." },
];

// Group questions by section
const QUESTIONS_BY_SECTION = SECTIONS.reduce((acc, s) => {
  acc[s.id] = QUESTIONS.filter(q => q.section === s.id);
  return acc;
}, {});

// Get current question by global index (0-based)
function getQuestionByGlobalIndex(idx) {
  return QUESTIONS[idx];
}

// Get section index for a given question (0-based section index)
function getSectionIndexForQuestion(qIdx) {
  const q = QUESTIONS[qIdx];
  return SECTIONS.findIndex(s => s.id === q.section);
}

// Get question index within its section (1-based)
function getQuestionIndexInSection(qIdx) {
  const q = QUESTIONS[qIdx];
  const sectionQs = QUESTIONS_BY_SECTION[q.section];
  return sectionQs.findIndex(sq => sq.id === q.id) + 1;
}
