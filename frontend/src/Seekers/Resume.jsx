
import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Search,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Sparkles,
  Eye,
  FileCheck,
  X,
} from "lucide-react";

const suggestions = [
  {
    title: "Add missing keywords",
    description:
      "Include relevant skills from the target job description to improve keyword matching.",
    priority: "High",
    color: "red",
    icon: AlertCircle,
  },
  {
    title: "Improve your professional summary",
    description:
      "Write a concise summary highlighting your experience, strengths, and career goals.",
    priority: "Medium",
    color: "amber",
    icon: FileText,
  },
  {
    title: "Use a clean resume format",
    description:
      "Use clear headings, consistent formatting, and readable fonts throughout your resume.",
    priority: "Good",
    color: "green",
    icon: CheckCircle,
  },
  {
    title: "Highlight achievements",
    description:
      "Add measurable results to your experience and project descriptions wherever possible.",
    priority: "Medium",
    color: "amber",
    icon: Target,
  },
];

const suggestionStyles = {
  red: {
    icon: "bg-red-50 text-red-600",
    badge: "bg-red-50 text-red-700",
    border: "border-red-100",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-700",
    border: "border-amber-100",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
    border: "border-emerald-100",
  },
};

function Resume() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop().toLowerCase();
    const allowed = ["pdf", "doc", "docx"];

    if (!allowed.includes(extension)) {
      setError("Upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setAnalyzed(false);
  };

  const handleAnalyze = () => {
    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    setError("");
    setAnalyzing(true);

    // Demo only. Replace with your Django API request.
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1000);
  };

  const removeFile = () => {
    setFile(null);
    setAnalyzed(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatSize = (bytes) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <main className="min-h-screen w-full min-w-0 bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Page header */}
      <header className="mb-7 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-orange-600">
            <Sparkles size={15} />
            CAREER TOOLS
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Resume <span className="text-orange-500">Analyzer</span>
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Analyze your resume, check ATS compatibility, and discover
            opportunities to improve your profile.
          </p>
        </div>

        <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-500 sm:flex">
          <FileCheck size={42} strokeWidth={1.5} />
        </div>
      </header>

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        {/* LEFT COLUMN */}
        <div className="grid min-w-0 gap-5">
          {/* Upload resume */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                <Upload size={21} />
              </div>

              <div>
                <h2 className="font-bold">Upload your resume</h2>
                <p className="mt-1 text-xs text-slate-500">
                  PDF, DOC or DOCX · Maximum 5 MB
                </p>
              </div>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`flex min-h-60 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-7 text-center transition ${
                file
                  ? "border-orange-400 bg-orange-50/60"
                  : "border-orange-200 bg-orange-50/30 hover:border-orange-400 hover:bg-orange-50"
              }`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Upload size={28} />
              </div>

              <h3 className="text-sm font-bold">
                Drag and drop your resume here
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                or browse files from your computer
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Upload size={17} />
                Choose File
              </button>

              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              <p className="mt-4 text-[11px] text-slate-400">
                Supported formats: PDF, DOC, DOCX
              </p>
            </div>

            {error && (
              <p className="mt-3 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {file && (
              <div className="mt-4 flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <FileText size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{file.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove resume"
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}

            <button
              type="button"
              disabled={!file || analyzing}
              onClick={handleAnalyze}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Analyze Resume
                </>
              )}
            </button>
          </section>

          {/* Target job description */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Target size={21} />
              </div>

              <div>
                <h2 className="font-bold">Target job description</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Optional · Compare your resume with a target role
                </p>
              </div>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              placeholder="Paste the job description here to check relevant skills, qualifications, and keywords..."
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />

            <div className="mt-2 flex justify-between gap-3 text-[11px] text-slate-400">
              <span>{jobDescription.length} characters</span>
              <span>Recommended for better matching</span>
            </div>
          </section>

          {/* Resume preview */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Eye size={21} />
              </div>

              <div>
                <h2 className="font-bold">Resume preview</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Your uploaded document
                </p>
              </div>
            </div>

            {file ? (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                <FileText size={42} className="text-orange-500" />

                <p className="mt-3 max-w-full break-all text-sm font-semibold">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatSize(file.size)}
                </p>

                <p className="mt-4 max-w-sm text-xs leading-5 text-slate-500">
                  Document preview will be available when PDF or DOCX
                  preview support is connected.
                </p>
              </div>
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <FileText size={35} className="text-slate-300" />
                <p className="mt-3 text-sm text-slate-500">
                  Upload a resume to see its preview here.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid min-w-0 gap-5">
          {/* ATS score */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.16em] text-orange-600">
                  YOUR RESULTS
                </p>
                <h2 className="mt-2 text-lg font-bold sm:text-xl">
                  ATS Compatibility
                </h2>
              </div>

              {analyzed && (
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                >
                  <RefreshCw size={14} />
                  Re-analyze
                </button>
              )}
            </div>

            {!analyzed ? (
              <div className="py-5 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Target size={36} />
                </div>

                <h3 className="mt-5 font-bold">
                  Your results will appear here
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Upload your resume and start the analysis to review your
                  score, keywords, formatting, and improvement areas.
                </p>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <span className="text-sm text-slate-500">ATS Score</span>
                  <span className="text-xl font-extrabold">-- / 100</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center gap-6 py-3 sm:flex-row">
                  <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#f97316_0%_78%,#e2e8f0_78%_100%)]">
                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                      <strong className="text-4xl font-extrabold">78</strong>
                      <span className="text-xs text-slate-500">
                        out of 100
                      </span>
                    </div>
                  </div>

                  <div className="text-center sm:text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle size={14} />
                      Demo result
                    </span>

                    <h3 className="mt-3 font-bold">
                      Your analysis preview
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      The following values are examples. Connect your
                      backend to calculate an actual compatibility score.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-100 bg-slate-50 py-4">
                  <div className="px-2 text-center">
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Keywords
                    </p>
                    <strong className="mt-2 block text-base text-emerald-600 sm:text-lg">
                      12/15
                    </strong>
                  </div>

                  <div className="px-2 text-center">
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Missing
                    </p>
                    <strong className="mt-2 block text-base text-orange-600 sm:text-lg">
                      3
                    </strong>
                  </div>

                  <div className="px-2 text-center">
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Formatting
                    </p>
                    <strong className="mt-2 block text-base text-emerald-600 sm:text-lg">
                      85/100
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Improvement suggestions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Lightbulb size={22} />
              </div>

              <div>
                <h2 className="font-bold">Improvement suggestions</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Make your resume stand out
                </p>
              </div>
            </div>

            {!analyzed ? (
              <div className="my-8 flex flex-col items-center text-center">
                <Sparkles size={30} className="text-orange-400" />

                <h3 className="mt-4 text-sm font-bold">
                  Personalized tips await
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">
                  Analyze your resume to see suggestions based on your
                  resume content and target job.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {suggestions.map((item) => {
                  const Icon = item.icon;
                  const styles = suggestionStyles[item.color];

                  return (
                    <article
                      key={item.title}
                      className={`flex min-w-0 items-start gap-3 rounded-xl border ${styles.border} p-4`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles.icon}`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-bold">
                            {item.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles.badge}`}
                          >
                            {item.priority}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500">
                <Sparkles size={21} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Ready for your next opportunity?
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Improve your resume and prepare for your next application.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Resume;