# Clinical decision logic — gonorrhea and tuberculosis modules

This document states every rule the gonorrhea and tuberculosis wizards apply, so a civil surgeon can audit the app against the CDC Technical Instructions (TI) without reading code. Sources are the CDC TI for Civil Surgeons (gonorrhea, effective Sept 1, 2021; tuberculosis, effective March 11, 2024), the CDC STI Treatment Guidelines (2021), USCIS Form I-693 (edition 01/20/25) and its instructions, the USCIS Policy Manual (Vol. 8, Part B, Ch. 6), and restatements of the TI published by the California Tuberculosis Controllers Association (CTCA), the Mayo Clinic Center for Tuberculosis and county health departments.

Class meaning used throughout:

| Banner | Meaning | Form I-693 |
|---|---|---|
| Class A (red) | Inadmissible until treatment is completed and documented. The civil surgeon does not clear the applicant. | Class A checkbox |
| Class B (amber) | May be cleared. Must be documented and reported; follow-up required. | Class B checkbox (TB: B0 / B1 / B2 / Other chest condition) |
| No Class (green) | No Class A or Class B condition. | "No Class A or Class B …" checkbox |
| Pending (slate) | A result, a test of cure or a health-department evaluation is outstanding. Do not classify or sign. | — |

---

## Gonorrhea

### Who is tested
* Ages 18 through 24: NAAT required.
* Under 18 or over 24: NAAT required if there is reason to suspect infection. The TI history asks about genitourinary symptoms (urethral, vaginal or rectal discharge; dysuria; intermenstrual bleeding; lower abdominal or pelvic pain; rectal pain). The app also lists clinical-judgement reasons from the STI Guidelines (partner with gonorrhea, pharyngeal or rectal exposure with symptoms, conjunctivitis, rash or joint pain, a recent outside positive test).
* No test indicated → **No Class A or Class B Gonorrhea**.

### The test
* NAAT only (Gram stain not accepted), ordered by the civil surgeon at the time of the exam. Tests performed elsewhere or before the exam are not acceptable.
* Least-invasive specimen: first-catch urine (any sex) or self-collected vaginal swab (women); throat and/or rectal swabs by clinical judgement.
* No genital exam for the gonorrhea portion. Evaluate pharyngeal discharge, rash, ocular symptoms, abdominal tenderness.
* Negative → **No Class A or Class B Gonorrhea**. The result page can show a note for applicants with gonorrhea treated in the last 12 months (the I-693 checkbox reads "Class B (treated in the last year)"; the TI bases classification on the civil surgeon's NAAT).
* Result pending → **Pending**.

### Positive NAAT
A positive NAAT is **Gonorrhea, Class A (untreated)** until treatment is completed.

| Situation | Outcome |
|---|---|
| Uncomplicated urogenital/rectal infection, treated in the office under direct observation | **Class B (treated in the last year)** |
| Pharyngeal infection, treated in the office | **Pending** until a NAAT or culture test of cure 14 days after treatment, performed by the civil surgeon, is negative → **Class B**. Positive test of cure → **Class A** (treatment failure or reinfection: ID/STD consult, culture and susceptibility, retreat, report, repeat test of cure). |
| Complicated infection (disseminated infection, conjunctivitis, PID, epididymitis) | **Class A** until the full CDC complicated-infection course is completed and documented → **Class B**. The single-dose table is not used. |
| Treated after this test by another provider, with written documentation (provider, drug, dose, route, date), given after the specimen was collected, with a site-appropriate CDC regimen (throat: ceftriaxone only) | **Class B**, with a warning that the TI requires onsite, directly observed treatment and does not expressly recognise outside treatment. Throat infection also needs a documented negative test of cure, otherwise **Pending**. |
| Outside treatment given before the specimen, a non-recommended regimen, or incomplete records | **Class A** — treat now in the office. |
| Treatment not yet given | **Class A** — cannot be cleared until treated. |
| Applicant refuses treatment | **Class A**; mark the Class A checkbox, do not certify treatment, document counselling and refusal; inadmissible under INA 212(a)(1)(A)(i) unless USCIS grants a discretionary 212(g)(1) waiver (USCIS/INA, not TI text). |

### Regimens (CDC STI Treatment Guidelines 2021)
* Uncomplicated urogenital, rectal or pharyngeal: ceftriaxone 500 mg IM single dose; 1 g IM if 150 kg (330 lb) or more.
* Chlamydia not excluded: offer doxycycline 100 mg PO twice daily for 7 days (pregnancy: azithromycin 1 g PO single dose). The applicant may decline; chlamydia is not a Class A condition and does not change the gonorrhea class.
* Cephalosporin allergy, urogenital/rectal only: gentamicin 240 mg IM + azithromycin 2 g PO, single doses (the azithromycin also covers chlamydia). Pharyngeal infection or pregnancy with cephalosporin allergy: consult an infectious-disease / STD expert.
* Ceftriaxone unavailable: cefixime 800 mg PO single dose (urogenital/rectal only).
* Complicated infection: DGI ceftriaxone 1 g IM/IV every 24 h (7 days or more); conjunctivitis ceftriaxone 1 g IM single dose; PID ceftriaxone 500 mg IM (1 g if ≥ 150 kg) + doxycycline 100 mg BID × 14 d + metronidazole 500 mg BID × 14 d; epididymitis ceftriaxone 500 mg IM + doxycycline 100 mg BID × 10 d.
* Gepotidacin and zoliflodacin (FDA-approved Dec 2025 for uncomplicated urogenital infection only) are not in the CDC guidelines.

### Documentation and reporting
* Form I-693 Part 8 (Civil Surgeon Worksheet), C. Gonorrhea: lab test used and date; drug, dose, route; start date, completion date, any interruption; clinical course. Lab reports are not attached.
* [TI] recommend treatment of sex partners. [STI Guidelines] expedited partner therapy, retest in 3 months, test for chlamydia, syphilis and HIV. [State law] report to the health department of jurisdiction.

---

## Tuberculosis

### Who is tested
* 2 years and older: IGRA (QuantiFERON-TB Gold Plus or T-SPOT.TB) required; a TST is not a substitute. IGRA type and result are recorded for everyone tested, including negative and indeterminate results.
* Under 2 years: no routine test. Signs or symptoms of TB disease or known HIV infection (TI) → TST or IGRA plus a chest x-ray. Recent contact with infectious TB (recommended, not TI) → coordinate with the health-department contact investigation.
* The IGRA may be skipped only with complete written documentation of a prior positive IGRA (date, IGRA type, result with units, provider). A prior positive TST does not waive the IGRA. A chest x-ray is still required.
* Outside x-rays and labs are not accepted; HIV testing is not required (only known HIV infection matters). An overseas Class B1/B2 classification does not change the evaluation.

### IGRA result
* Negative or indeterminate, with no symptoms, no HIV, no prior TB and no prior LTBI treatment → **No Class A or Class B TB**. Indeterminate is recorded as indeterminate (USCIS: treat as negative); no repeat test, x-ray or B2; the applicant is advised to repeat for their own health.
* Positive, or any of: symptoms, known HIV, documented prior LTBI treatment, prior TB disease → chest x-ray (AP/PA + lateral under 10 years; PA at 10 years and older).
* Result pending → **Pending**.

### Chest x-ray
* Lead shielding is no longer recommended or required (2024 TI). A pregnant applicant may postpone the x-ray until after delivery; Form I-693 cannot be completed until the x-ray is performed, read and followed up.
* X-ray not done / deferred → **Pending**.
* Abnormal and suggestive of active **or inactive (old)** TB → health-department referral.

### Health-department referral (required, regardless of IGRA or x-ray)
Referral for sputum testing is required for: an x-ray suggestive of TB; signs or symptoms of TB disease; known HIV infection. Also, in this app, prior TB disease whose treatment was incomplete, undocumented, or completed less than one year ago.

* Three sputum specimens (NAAT on the first, AFB smears, cultures final at 6 to 8 weeks, drug-susceptibility testing on positives). Children who cannot expectorate: induced sputum or gastric aspirates at the health department.
* The civil surgeon enters the referral in Part 8, Item 5; the health department completes and signs Part 9 (Referral Evaluation); the civil surgeon does not sign Part 7 until Part 9 is returned. Suspected TB disease is reportable immediately.
* Shown as **Pending** until the applicant returns.

### Classification after the health department's evaluation

| Health-department determination | Form I-693 checkbox |
|---|---|
| Active TB disease, treatment not started or not completed | **Class A Pulmonary TB Disease** — inadmissible until a CDC/ATS/IDSA regimen is completed with health-department sign-off, then B0 |
| Active TB disease, treatment completed during this process (health-department letter) | **Class B0 Pulmonary TB** |
| Sputum smears and cultures negative, TB disease not diagnosed (regardless of IGRA) | **Class B1 Pulmonary TB** |
| Extrapulmonary TB only, pulmonary TB excluded (pleura, larynx and intrathoracic nodes count as pulmonary) | **Class B1 Extrapulmonary TB** — signable while treatment continues through the health department |
| Health department re-read the x-ray as not suggestive of TB (no sputum evaluation) | positive IGRA → **Class B2 TB, Latent TB Infection**; negative IGRA → **Class B, Other Chest Condition (non-TB)** |

### Classification without a referral

| Findings | Form I-693 checkbox |
|---|---|
| Positive IGRA (or documented prior positive), normal x-ray, no symptoms, no HIV | **Class B2 TB, Latent TB Infection** — report to the health department at the time of the exam (name, contact information, IGRA result, x-ray result); eMedical within 5 business days of signing; LTBI treatment (3HP, 4R, 3HR, 6H/9H) recommended, not required; leave Part 8, Item 5 blank |
| Positive IGRA, abnormal x-ray not suggestive of TB | **Class B2 TB, Latent TB Infection** plus documentation of the other chest condition (option to refer if unsure) |
| Negative/indeterminate IGRA, abnormal x-ray not suggestive of TB | **Class B, Other Chest Condition (non-TB)** |
| Negative/indeterminate IGRA, normal x-ray | **No Class A or Class B TB** |
| Positive IGRA, normal x-ray, documented completed LTBI treatment (3HP, 4R, 3HR or 6H/9H with dates) | **No Class A or Class B TB** — not reported, no eMedical entry; document the regimen and dates. Incomplete or undocumented LTBI treatment is treated as no treatment (B2). |
| Positive IGRA, normal x-ray, documented completed treatment for TB disease finished one year ago or more (records reviewed) | **No Class A or Class B TB** — see "to verify" below |

A positive IGRA never ends as "No Class" except with documented completed LTBI (or TB-disease) treatment. There is no Class B3 for civil surgeons (it belongs to the overseas panel-physician scheme).

### Reporting
All TB classifications are reported promptly to the health department of jurisdiction. B0, B1 and B2 are entered in eMedical within 5 business days of signing.

---

## Items to verify against the live CDC pages before relying on them

The build environment could not open cdc.gov directly; every rule above was reconstructed from search excerpts of the CDC pages and from published restatements. Three points rest on medium-confidence evidence and should be checked against the current TI text:

1. **Prior treated TB disease with a normal x-ray.** The CDC panel-physician TI gives "No TB Classification" to a well-documented completion one year or more earlier with a normal x-ray, no symptoms and no HIV; one restatement attributes the same rule to the civil-surgeon page. The app applies it; confirm the civil-surgeon wording.
2. **Pharyngeal test of cure before completing the exam.** The civil-surgeon TI exempts only uncomplicated urogenital or rectal infection from a pre-completion test of cure; the 14-day pharyngeal requirement is quoted from the parallel panel-physician TI.
3. **Form I-693 part and item numbers** (Part 8 Item 5, Part 9, Part 7) are quoted from the 01/20/25 instructions as excerpted; confirm against the PDF.
4. **TB class checkbox when no x-ray was taken.** Draft copies of the form note that the TB classification is selected only if a chest x-ray was performed. For a negative or indeterminate IGRA without an x-ray the app shows "No Class A or Class B TB" together with that caveat (record the IGRA result; leave the TB class box blank if your edition requires it).
