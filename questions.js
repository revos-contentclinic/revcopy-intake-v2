/* ====================================================================
   RevUP Intake — Question Definitions
   74 questions across 7 sections. Each question has:
     - id, section, subsection
     - type (text|url|textarea|textarea-large|textarea-huge|radio|checkbox|subfields)
     - label (the question)
     - hint (optional sub-line)
     - why (margin "why we ask" microcopy — specific to this question)
     - options or subfields where relevant
   ==================================================================== */

const SECTIONS = [
  {
    id: 'A',
    title: 'The Business & The Offer',
    subtitle: 'What you sell, who carries it, what it costs.',
    why: 'Every number and term here directly shapes price-justification, guarantee framing, and offer architecture in the letter. If any of this is "roughly," we need to firm it up before drafting.',
    timeEst: '~10 min',
    questionCount: 18,
  },
  {
    id: 'B',
    title: 'The Founder & Spokesperson',
    subtitle: 'Who is on the other end of the letter — honestly.',
    why: 'The reader needs to feel who is on the other end of the letter. Authority without a person collapses. Personality without substance collapses. We need both, honest.',
    timeEst: '~12 min',
    questionCount: 17,
  },
  {
    id: 'C',
    title: 'The Audience',
    subtitle: 'Their world, their voice, their fears.',
    why: 'Generic demographics will not cut it. We need their internal voice — what they actually say, what they actually fear, what they actually want.',
    timeEst: '~25 min',
    questionCount: 18,
  },
  {
    id: 'D',
    title: "The Letter's Specific Job",
    subtitle: 'The belief that has to move.',
    why: 'Every letter has to move the reader from one belief to another. If we do not know what belief is blocking the buy, the letter shoots blanks.',
    timeEst: '~10 min',
    questionCount: 4,
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
    subtitle: 'The world the letter lands in.',
    why: 'The letter has to land in the real world the reader is living in — not a vacuum. We need the surrounding context to calibrate angle and urgency.',
    timeEst: '~10 min',
    questionCount: 6,
  },
  {
    id: 'G',
    title: 'Constraints & Boundaries',
    subtitle: 'The rules that protect the work.',
    why: 'The letter has to work within your rules — legal, brand, personal. Tell us now, not after the draft.',
    timeEst: '~5 min',
    questionCount: 4,
  },
];

const QUESTIONS = [
  // ============== SECTION A — Business & Offer ==============
  // A1. Business snapshot
  { id:'q1', section:'A', subsection:'A1. Business snapshot', type:'text',
    label:'Company or brand name.',
    why:"Anchors letterhead, by-line, and any references in copy." },
  { id:'q2', section:'A', subsection:'A1. Business snapshot', type:'url',
    label:'Website URL.',
    hint:"So we can read the room before drafting — your existing tone, positioning, and what your audience already sees.",
    why:"We read your site before writing. Your existing voice, the way you treat current readers, the positioning you have already done — all of that should match the letter." },
  { id:'q3', section:'A', subsection:'A1. Business snapshot', type:'textarea',
    label:'What you sell, in one sentence, in your own words.',
    why:"If you cannot describe the offer in one sentence, the letter cannot either. This sentence is also a diagnostic — sometimes the work begins by getting it right." },

  // A2. Specific offer
  { id:'q4', section:'A', subsection:'A2. The specific offer', type:'text',
    label:'Offer name.',
    why:"Becomes the name in the offer reveal block. Honest naming matters — no inflated rebrand of a thin product." },
  { id:'q5', section:'A', subsection:'A2. The specific offer', type:'textarea-large',
    label:"What's actually included.",
    hint:"List everything: main product, bonuses, access, support, community, delivery mechanics.",
    why:"This is the inventory we translate into reader-facing benefits. Every component gets named honestly. Nothing inflated. Nothing hidden." },
  { id:'q6', section:'A', subsection:'A2. The specific offer', type:'textarea',
    label:'Price and payment terms.',
    hint:"Full-pay, installments, payment plan, any discounts.",
    why:"The price gets revealed plainly in the letter. Hidden pricing is a non-starter for us. Tell us the real price now so we can frame it honestly." },
  { id:'q7', section:'A', subsection:'A2. The specific offer', type:'text',
    label:'Delivery format.',
    hint:"Online course, coaching, software, physical product, service, hybrid.",
    why:"Shapes what readers picture themselves receiving. Different formats need different reveal language." },
  { id:'q8', section:'A', subsection:'A2. The specific offer', type:'textarea',
    label:'What happens on Day 1 after purchase.',
    why:"Vivid Day-1 detail defuses purchase anxiety. Anxious buyers want to picture exactly what they will experience the moment they click." },
  { id:'q9', section:'A', subsection:'A2. The specific offer', type:'text',
    label:'Access duration.',
    hint:"Lifetime, 12 months, subscription, cohort-based, etc.",
    why:"Frames the guarantee window and the long-term value framing." },

  // A3. Bonuses
  { id:'q10', section:'A', subsection:'A3. Bonuses (skip if none)', type:'textarea-large',
    label:'List each bonus separately. For each: what it is + its honest standalone value.',
    hint:"Skip if your offer has no bonuses. Otherwise: not inflated. What you would genuinely charge for it if sold alone.",
    why:"Bonuses each must stand alone at honest value. Inflated retail values collapse trust the moment a reader does the math. Tell us what each is genuinely worth on its own." },

  // A4. Guarantee
  { id:'q11', section:'A', subsection:'A4. The guarantee', type:'textarea',
    label:"What's your guarantee?",
    hint:"30-day money-back, conditional refund, no-questions-asked, performance-based, or no guarantee.",
    why:"The guarantee carries the close. We need its real shape — not a marketing version." },
  { id:'q12', section:'A', subsection:'A4. The guarantee', type:'textarea',
    label:'What is the actual refund process?',
    hint:"How does a buyer claim it? How long does it take? Who handles it?",
    why:"Operationally clean guarantees defuse skepticism. If a buyer cannot picture the refund process, they suspect there is a catch." },
  { id:'q13', section:'A', subsection:'A4. The guarantee', type:'textarea',
    label:'Any conditions attached?',
    hint:"If yes, list them plainly. We never hide conditions in fine print.",
    why:"Hidden conditions are a hard no in the letter. If the conditions are there, we name them up front and let the buyer decide. That's honest." },
  { id:'q14', section:'A', subsection:'A4. The guarantee', type:'textarea',
    label:'Are you genuinely comfortable honoring this guarantee if someone asks?',
    hint:"If the honest answer is 'we hope they don't,' we will need to rework the guarantee before writing.",
    why:"This is a hard checkpoint. If you would resist honoring the guarantee, the letter cannot promise it cleanly. We will pause and rework before writing a word." },

  // A5. Business math
  { id:'q15', section:'A', subsection:'A5. Business math', type:'textarea-large',
    label:'What business metrics do you track? Share whichever you have.',
    hint:"CAC, conversion rate on the page this letter replaces, email list size + engagement, main traffic sources, anything else relevant.",
    why:"This tells us which lever the letter has to pull. If you don't track any of these, we may pause and instrument before drafting — guesswork shows up in copy as soft moves." },

  // A6. Growth phase & capacity
  { id:'q16', section:'A', subsection:'A6. Growth phase & capacity', type:'radio',
    label:'Which growth phase are you in right now?',
    options: [
      { value:'early', title:'Early', desc:'Just launched / still finding the audience.' },
      { value:'scaling', title:'Scaling', desc:'Have a working model, pushing volume.' },
      { value:'mature', title:'Mature', desc:'Established, optimising.' },
      { value:'pivoting', title:'Pivoting', desc:'Changing direction.' },
    ],
    why:"Growth phase shapes which awareness level we target. Early stages target the warmest audience for fastest ROI. Scaling stages can afford colder, larger audiences. Mature can go anywhere." },
  { id:'q17', section:'A', subsection:'A6. Growth phase & capacity', type:'subfields',
    label:'Capacity to deploy this letter.',
    subfields: [
      { id:'budget', label:'Budget for traffic / paid amplification', placeholder:'e.g. $5k/mo, organic only, etc.' },
      { id:'team', label:'Team bandwidth (who executes once it ships)', placeholder:'e.g. solo founder, 2-person team, agency-supported' },
      { id:'duration', label:'How long do you need this letter to perform', placeholder:'one-time push / evergreen / seasonal' },
    ],
    why:"Capacity has to match the ambition of the letter. A cold-traffic Unaware-target letter with a Most-Aware-sized budget will ship but not perform." },

  // A7. Timeline
  { id:'q18', section:'A', subsection:'A7. Timeline', type:'textarea',
    label:'When do you need the letter live?',
    hint:"And is there a real external reason driving that date — launch event, cohort start, seasonal window — or is it flexible?",
    why:"Timeline shapes how deep we can go on Altitude 2 positioning work upstream. A 2-week deadline closes off some moves a 2-month deadline opens up." },

  // ============== SECTION B — Founder & Spokesperson ==============
  // B1. About you
  { id:'q19', section:'B', subsection:'B1. About you', type:'text',
    label:'Who is the spokesperson?',
    hint:"You / a partner / a named expert.",
    why:"The spokesperson's voice shapes every paragraph. Founder-voice and brand-voice render very differently." },
  { id:'q20', section:'B', subsection:'B1. About you', type:'text',
    label:'Name + title or credentials.',
    why:"The by-line and authority framing in the letter come from this. Real credentials only — implied authority breaks the Filter." },

  // B2. Genuine craft
  { id:'q21', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:'What do you actually do, day-to-day, when working with clients or customers?',
    hint:"Describe your real process — not the marketing version.",
    why:"The mechanism behind your work is the most credible thing in the letter. Show how the sausage is made — calmly, specifically, real." },
  { id:'q22', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:"What's the thing you're genuinely great at — the thing you'd still do even if you weren't paid?",
    why:"This is where your voice lives. The thing you do for free is the thing readers feel through every paragraph." },
  { id:'q23', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:"What's your non-negotiable standard?",
    hint:"Something you'd sacrifice anything to deliver. If a project required violating this, you'd walk. What is it?",
    why:"This is the foundation for any criteria gravity work. The standard you refuse to drop becomes the criterion the market starts using to evaluate your category." },
  { id:'q24', section:'B', subsection:'B2. Your genuine craft', type:'textarea',
    label:'What do you genuinely refuse to do in this work — even when a client asks or a competitor does it?',
    why:"Honest polarisation in the letter comes from real refusals — not invented enemies. Tell us what you actually will not do." },

  // B3. Origin + mission
  { id:'q25', section:'B', subsection:'B3. Origin + mission', type:'textarea-large',
    label:'How did you end up doing this work?',
    hint:"Real story, not the LinkedIn version.",
    why:"The origin story is the identification bridge. Readers who feel they recognise themselves in your origin become the ones who buy and stay." },
  { id:'q26', section:'B', subsection:'B3. Origin + mission', type:'textarea',
    label:"If you've personally lived the problem your product solves, tell us.",
    why:"Lived experience is irreplaceable credibility. If you have it, the letter leans on it. If you don't, we work with what is real instead." },
  { id:'q27', section:'B', subsection:'B3. Origin + mission', type:'textarea',
    label:'Why this mission now?',
    hint:"Honest answer. Even if 'I need to pay the bills' is part of it, say so. We render it cleanly.",
    why:"Fabricated altruism is detectable. Real mission — even if it includes wanting to make a living — reads as honest. We never fake purpose." },

  // B4. Track record
  { id:'q28', section:'B', subsection:'B4. Your track record', type:'textarea',
    label:'Specific things you have built, delivered, predicted, or produced that worked.',
    why:"This is the proof reservoir we draw from for credibility moments throughout the letter. Specifics convert. Vague claims do not." },
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
    why:"Vocabulary is voice fingerprint. The words you reach for and the ones you reject define how the letter sounds." },
  { id:'q33', section:'B', subsection:'B5. Your voice & personality', type:'textarea',
    label:'Do you want the letter to sound like you, or like a polished brand voice?',
    hint:"There is no wrong answer.",
    why:"Two different voice renders. Founder-voice is more intimate, less polished, often more persuasive. Brand-voice is cleaner but less differentiating. Your call." },
  { id:'q34', section:'B', subsection:'B5. Your voice & personality', type:'textarea',
    label:'Any writers, podcasters, or speakers whose voice feels close to how you would want this letter to sound?',
    why:"Reference voices help us calibrate fast. Naming three writers you respect tells us more than ten paragraphs of voice description." },

  // B6. Warm-exit posture
  { id:'q35', section:'B', subsection:'B6. Warm-exit posture (critical)', type:'textarea',
    label:'Are you genuinely okay with the right readers filtering themselves out after reading?',
    hint:"This is not a trick question. If your honest answer is 'I want everyone who reads it to buy,' we will discuss before writing — chasing filtered-out readers collapses the architecture that makes the letter work.",
    why:"This is the second hardest checkpoint after the guarantee question. Honest letters lose some prospects on purpose. If you cannot accept that, we work on the offer or audience first — not the copy." },

  // ============== SECTION C — The Audience ==============
  // C1. Best-fit clients
  { id:'q36', section:'C', subsection:'C1. Best-fit clients', type:'textarea-large',
    label:'Describe your single best client or customer so far.',
    hint:"Not a statistic — a specific person. Their situation, how they found you, what changed for them, why they thrived. (Use initials or a persona if names are sensitive.)",
    why:"One specific best-client story tells us more about who the letter is for than ten persona docs. Specifics drive identification." },
  { id:'q37', section:'C', subsection:'C1. Best-fit clients', type:'textarea',
    label:'What kind of person becomes your best client pattern?',
    hint:"Identity-level — not just 'small business owner' but what makes them this kind of small business owner.",
    why:"Identity-anchored audiences pattern-match. Demographic-anchored audiences scroll past. We aim for the identity, not the bracket." },
  { id:'q38', section:'C', subsection:'C1. Best-fit clients', type:'textarea',
    label:'Who is this letter NOT for?',
    hint:"Honest answer. Who should filter themselves out?",
    why:"A letter that filters honestly is more effective than a letter that tries to convert everyone. Knowing who not to write to sharpens who we write to." },

  // C2. How they talk
  { id:'q39', section:'C', subsection:'C2. How they talk', type:'textarea-huge',
    label:'Paste 3 to 10 direct quotes from real clients — things they said before, during, or after buying from you.',
    hint:"Emails, testimonials, DMs, transcripts. Verbatim. If they said 'I was drowning in this,' we need 'I was drowning' — not 'overwhelmed.'",
    why:"This is the single most important answer in the entire intake. The reader's actual language is what makes the letter feel like it was written for them. We will not invent it. We need real words." },
  { id:'q40', section:'C', subsection:'C2. How they talk', type:'textarea',
    label:'What phrases do prospects use when they first describe their problem to you?',
    hint:"Paste 3 to 5 actual phrases.",
    why:"Opening language lives here. The first paragraph of the letter has to sound like the inside of the reader's head." },

  // C3. What they want
  { id:'q41', section:'C', subsection:'C3. What they want', type:'textarea-large',
    label:'What does the reader dream about achieving?',
    hint:"Be specific. Not 'success' but what success looks like in their life — the scene, the moment, the feeling.",
    why:"Vivid future-state visualisation is one of the strongest moves a letter can make. Generic dreams ('grow my business') are invisible. Specific scenes (Friday afternoon, kids home, no laptop open) convert." },
  { id:'q42', section:'C', subsection:'C3. What they want', type:'textarea',
    label:"What's the one thing they would pay almost anything to solve?",
    why:"This is the core desire we anchor the offer to. If we get this wrong, no amount of clever copy compensates." },

  // C4. What they fear
  { id:'q43', section:'C', subsection:'C4. What they fear', type:'textarea',
    label:'When a prospect first talks to you, what emotions come through?',
    hint:"Anxiety, shame, anger, exhaustion, hope, skepticism. Name what you actually hear.",
    why:"This calibrates the Force State diagnostic — which determines how the letter meets the reader emotionally. Pride-state readers need different opening moves than fear-state readers." },
  { id:'q44', section:'C', subsection:'C4. What they fear', type:'textarea-large',
    label:'What are they afraid of — specifically — and what are they afraid of admitting to others about it?',
    hint:"Not abstract fears. Real language. Examples: 'being found out as a fraud at work,' 'losing the house,' 'that my spouse will think I'm throwing money away again.'",
    why:"Specific fears, including the shame layer they hide from others, give us the map of what the letter has to make safe to consider." },
  { id:'q45', section:'C', subsection:'C4. What they fear', type:'textarea',
    label:'What are they afraid will happen if they do not solve this?',
    why:"Cost of inaction. We name this once, calmly, never as a fear-amplification move. Calm naming of a real cost is more persuasive than scare tactics." },
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
    why:"This is where the belief-to-shift often hides. The story they tell about why everything failed before is the belief the letter has to honour and reframe — not attack." },
  { id:'q49', section:'C', subsection:"C5. What they've tried", type:'textarea',
    label:'What do they now believe about solutions in your category because of those failures?',
    why:"This is often the operating belief that blocks the buy. Knowing it lets us include it inside a larger frame, instead of fighting it." },

  // C6. How they decide
  { id:'q50', section:'C', subsection:'C6. How they decide', type:'textarea',
    label:'When making a decision like this, do they mostly decide alone or do they consult others?',
    hint:"Best guess. 'They will ask their spouse / business partner / coach' vs 'they will make the call themselves.'",
    why:"Internal decision-makers respond to autonomy. External decision-makers respond to social proof. The letter's close has to match the audience's mode." },
  { id:'q51', section:'C', subsection:'C6. How they decide', type:'textarea',
    label:'What do they need to see or hear before they are comfortable buying?',
    hint:"Testimonials? Data? A call with you? A guarantee? A specific credential?",
    why:"This tells us which proof channels to lead with. Different audiences need different combinations." },

  // C7. After they buy
  { id:'q52', section:'C', subsection:'C7. After they buy', type:'textarea',
    label:'When clients or customers work with you, what is the pattern?',
    hint:"Most ghost after 30 days? Stay for a few months? Stick around for years? Become raving fans?",
    why:"This is our cleanest read on customer level mix. Magic-bullet seekers ghost. Committed improvers stick. Transformation seekers stay. The letter's filter calibrates to which mix you actually want." },

  // C8. Traffic source
  { id:'q53', section:'C', subsection:'C8. How they arrive at this letter', type:'textarea',
    label:'How are people going to arrive at this sales letter?',
    hint:"Email list, paid ad on Facebook/Google, organic search, referral, podcast ad, retargeting, cold outbound, etc. If you do not know yet, tell us what you are considering.",
    why:"Traffic source informs the awareness-level mix likely in the read. We use this plus growth phase plus capacity to lock the strategic targeting decision." },

  // ============== SECTION D — Letter's Specific Job ==============
  // D1. Belief-shift
  { id:'q54', section:'D', subsection:'D1. Belief-shift', type:'textarea-large',
    label:'What is the #1 thing the reader currently believes that is keeping them from buying?',
    hint:"Example: 'I have tried stuff like this before and nothing works' / 'I do not have the time' / 'This is too expensive' / 'I am too far gone' / 'This is for other people, not me.' Be specific to your audience.",
    why:"This is the hardest question in the intake — and the most important. Most clients cannot answer cleanly on first pass. That is fine. Give us your best guess as a foothold, we sharpen on the call." },
  { id:'q55', section:'D', subsection:'D1. Belief-shift', type:'textarea-large',
    label:'What does the reader need to believe instead — after they finish reading — for the offer to feel like the obvious next step?',
    why:"The destination belief. This is what every paragraph of the letter is engineered to install — gently, through inclusion, never through attack." },
  { id:'q56', section:'D', subsection:'D1. Belief-shift', type:'textarea-large',
    label:'What is the piece of truth, evidence, story, or reframe that makes that belief-shift happen honestly?',
    hint:"Not a gimmick. What actually proves the new belief is true?",
    why:"Without real evidence, the shift cannot be made honestly. If the only path to the new belief is hype, we have a structural problem upstream — and the letter cannot fix it." },

  // D2. Market pressure on arrival
  { id:'q57', section:'D', subsection:'D2. Market pressure on arrival', type:'textarea',
    label:'What is your reader most likely feeling in the moment they click through to this letter?',
    hint:"Something specific pushed them to click. What pressure are they feeling right then? Urgent anxiety? Quiet dread? Defiant hope? Numb exhaustion? Name the feeling — it is where the letter begins the conversation.",
    why:"The opening of the letter has to acknowledge whatever state the reader is actually in when they arrive. Not the abstract emotional baseline — the specific feeling that drove the click." },

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
    why:"This is the load-bearing question for proof in the letter. Without a visible mechanism, the offer reads as 'just trust me.' With one, it reads as 'here is how this works, see for yourself.'" },
  { id:'q62', section:'E', subsection:'E3. Your mechanism', type:'textarea',
    label:'What about your method is different from how others do this?',
    why:"Differentiation. The wedge that makes you not-replaceable. We thread this through every credibility moment in the letter." },

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
    why:"Multi-channel proof prevents leakage. Readers process differently. A letter that proves itself only in writing loses readers who process visually or kinesthetically." },

  // ============== SECTION F — Market, Competitors, Timing ==============
  // F1. Competitors
  { id:'q65', section:'F', subsection:'F1. Competitors', type:'textarea',
    label:'Name 3 to 5 real competitors or alternatives the reader is considering.',
    why:"We need to know who you are positioned against. Differentiation requires real points of comparison." },
  { id:'q66', section:'F', subsection:'F1. Competitors', type:'textarea-large',
    label:'For each competitor: what do they promise, at what price, with what weaknesses?',
    why:"This is the differentiation map. The letter does not attack competitors — but it does honestly distinguish what your offer does that theirs cannot or will not." },

  // F2. Market context
  { id:'q67', section:'F', subsection:'F2. Market context', type:'textarea',
    label:'Anything happening in the world, the industry, or the culture right now that makes this product especially relevant?',
    hint:"Economic conditions, AI disruption, regulatory change, cultural shift, news cycle.",
    why:"Topical themes can give the letter disproportionate traction when timed right. Without real context, we skip topical and lean on other theme variables." },
  { id:'q68', section:'F', subsection:'F2. Market context', type:'textarea',
    label:'Any real, documentable systemic forces working against your reader that we should honestly name?',
    hint:"Not invented villains — genuine ones they already suspect.",
    why:"Real enemies, honestly named, sharpen positioning. Invented villains break the Filter immediately. We will only name what is genuinely real." },

  // F3. Timing & scarcity
  { id:'q69', section:'F', subsection:'F3. Timing & scarcity', type:'textarea',
    label:'Is there a REAL deadline tied to this offer?',
    hint:"Cohort close, inventory cap, price-increase date, seasonal window, event tied to the offer.",
    why:"Any urgency in the letter must trace to a real deadline here. Manufactured urgency is forbidden." },
  { id:'q70', section:'F', subsection:'F3. Timing & scarcity', type:'textarea',
    label:'Is there a REAL cap on how many people can join?',
    hint:"And what happens when the cap is reached? If no real cap, that is fine — we do not invent scarcity.",
    why:"Same as deadlines. Real scarcity gets named honestly. Fake scarcity is not negotiable — we will not write it." },

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
