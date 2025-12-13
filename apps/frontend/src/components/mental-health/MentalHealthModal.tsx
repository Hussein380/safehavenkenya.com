import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, MessageCircle, AlertTriangle, CheckCircle2, ChevronRight, Activity, Brain, HeartPulse, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA CONFIGURATION ---

const COMMON_OPTIONS_4 = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
];

const K10_OPTIONS = [
    { value: 1, label: "None of the time" },
    { value: 2, label: "A little of the time" },
    { value: 3, label: "Some of the time" },
    { value: 4, label: "Most of the time" },
    { value: 5, label: "All of the time" },
];

const WHO5_OPTIONS = [
    { value: 5, label: "All of the time" },
    { value: 4, label: "Most of the time" },
    { value: 3, label: "More than half of the time" },
    { value: 2, label: "Less than half of the time" },
    { value: 1, label: "Some of the time" },
    { value: 0, label: "At no time" },
];

const ASSESSMENTS = [
    {
        id: "phq9",
        name: "PHQ-9 (Depression Screen)",
        description: "Screens for depression and measures severity.",
        icon: <Brain className="w-5 h-5" />,
        questions: [
            "Little interest or pleasure in doing things",
            "Feeling down, depressed, or hopeless",
            "Trouble falling or staying asleep, or sleeping too much",
            "Feeling tired or having little energy",
            "Poor appetite or overeating",
            "Feeling bad about yourself - or that you are a failure",
            "Trouble concentrating on things, such as reading or TV",
            "Moving or speaking so slowly (or too fast) that others noticed",
            "Thoughts that you would be better off dead, or of hurting yourself"
        ],
        options: COMMON_OPTIONS_4,
        maxScore: 27
    },
    {
        id: "gad7",
        name: "GAD-7 (Anxiety Screen)",
        description: "Screens for General Anxiety Disorder.",
        icon: <Activity className="w-5 h-5" />,
        questions: [
            "Feeling nervous, anxious, or on edge",
            "Not being able to stop or control worrying",
            "Worrying too much about different things",
            "Trouble relaxing",
            "Being so restless that it is hard to sit still",
            "Becoming easily annoyed or irritable",
            "Feeling afraid as if something awful might happen"
        ],
        options: COMMON_OPTIONS_4,
        maxScore: 21
    },
    {
        id: "k10",
        name: "K10 (Psychological Distress)",
        description: "Measures non-specific psychological distress.",
        icon: <AlertTriangle className="w-5 h-5" />,
        questions: [
            "Did you feel tired out for no good reason?",
            "Did you feel nervous?",
            "Did you feel so nervous that nothing could calm you down?",
            "Did you feel hopeless?",
            "Did you feel restless or fidgety?",
            "Did you feel so restless you could not sit still?",
            "Did you feel depressed?",
            "Did you feel that everything was an effort?",
            "Did you feel so sad that nothing could cheer you up?",
            "Did you feel worthless?"
        ],
        options: K10_OPTIONS,
        maxScore: 50 // 10 * 5
    },
    {
        id: "dass21",
        name: "DASS-21 (Depression, Anxiety, Stress)",
        description: "Assesses depression, anxiety, and stress levels.",
        icon: <HeartPulse className="w-5 h-5" />,
        questions: [
            "I found it hard to wind down",
            "I was aware of dryness of my mouth",
            "I couldn't seem to experience any positive feeling at all",
            "I experienced breathing difficulty (e.g. excessively rapid breathing)",
            "I found it difficult to work up the initiative to do things",
            "I tended to over-react to situations",
            "I experienced trembling (e.g. in the hands)",
            "I felt that I was using a lot of nervous energy",
            "I was worried about situations in which I might panic and make a fool of myself",
            "I felt that I had nothing to look forward to",
            "I found myself getting agitated",
            "I found it difficult to relax",
            "I felt down-hearted and blue",
            "I was intolerant of anything that kept me from getting on with what I was doing",
            "I felt I was close to panic",
            "I was unable to become enthusiastic about anything",
            "I felt I wasn't worth much as a person",
            "I felt that I was rather touchy",
            "I was aware of the action of my heart in the absence of physical exertion",
            "I felt scared without any good reason",
            "I felt that life was meaningless"
        ],
        options: COMMON_OPTIONS_4,
        maxScore: 63 // 21 * 3
    },
    {
        id: "who5",
        name: "WHO-5 (Well-Being Index)",
        description: "Measures overall subjective well-being.",
        icon: <Smile className="w-5 h-5" />,
        questions: [
            "I have felt cheerful and in good spirits",
            "I have felt calm and relaxed",
            "I have felt active and vigorous",
            "I woke up feeling fresh and rested",
            "My daily life has been filled with things that interest me"
        ],
        options: WHO5_OPTIONS,
        maxScore: 25 // 5 * 5
    }
];

// --- COMPONENT ---

interface AnalysisResult {
    score: number;
    label: string;
    message: string;
}

export const MentalHealthModal = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const [currentTest, setCurrentTest] = useState<typeof ASSESSMENTS[0] | null>(null);
    const [step, setStep] = useState(0); // 0 = Selection, 1... = questions, loading, result
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);

    // Reset when opening
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setTimeout(() => {
                setCurrentTest(null);
                setStep(0);
                setAnswers([]);
                setResult(null);
            }, 300);
        }
        onOpenChange(newOpen);
    };

    const startTest = (testId: string) => {
        const test = ASSESSMENTS.find(t => t.id === testId);
        if (test) {
            setCurrentTest(test);
            setAnswers(new Array(test.questions.length).fill(-1));
            setStep(1); // Start questions
        }
    };

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        // step 1 corresponds to index 0 of answers
        newAnswers[step - 1] = value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentTest && step < currentTest.questions.length) {
            setStep(step + 1);
        } else {
            submitTest();
        }
    };

    const analyzeScore = (score: number, maxScore: number, testId: string, testName: string) => {
        const ratio = score / maxScore;
        let label = "Assessment Complete";
        let message = "";

        // WHO-5: Higher score is better
        if (testId === 'who5') {
            if (ratio > 0.5) {
                label = "Well-being is Good";
                message = "Your responses suggest that your overall well-being is in a good range. You're experiencing positive emotions and life satisfaction. Continue to maintain healthy habits, stay connected with loved ones, and engage in activities that bring you joy. Remember, mental wellness is an ongoing journey, and it's great that you're taking time to check in with yourself.";
            } else if (ratio > 0.28) {
                label = "Reduced Well-being";
                message = "Your responses indicate that your well-being may be lower than ideal. This is a sign that it might be helpful to focus on self-care and consider reaching out for support. Try to engage in activities you enjoy, maintain regular sleep patterns, and connect with friends or family. If these feelings persist, consider speaking with a mental health professional.";
            } else {
                label = "Low Well-being";
                message = "Your responses suggest that your well-being is significantly impacted. It's important to know that you don't have to face this alone. Please reach out to our mental health expert for confidential support on WhatsApp: 0729 875 368. Professional support can make a significant difference, and there are effective strategies and treatments available to help improve your well-being.";
            }
        } else {
            // PHQ-9, GAD-7, K10, DASS-21: Lower score is better
            if (ratio < 0.25) {
                label = "Likely Minimal Symptoms";
                message = "Your responses suggest minimal symptoms at this time. This is positive news! Continue to maintain healthy lifestyle habits, stay connected with your support network, and practice regular self-care. Remember that mental health is an ongoing journey, and it's always okay to reach out for support if you notice changes in how you're feeling.";
            } else if (ratio < 0.50) {
                label = "Possible Mild Symptoms";
                message = "Your responses indicate the possibility of mild symptoms. While this may not be cause for immediate concern, it's a good time to focus on self-care strategies. Consider maintaining regular routines, getting adequate sleep, staying physically active, and connecting with supportive people in your life. If symptoms persist or worsen, don't hesitate to seek professional guidance.";
            } else if (ratio < 0.75) {
                label = "Possible Moderate Symptoms";
                message = "Your responses suggest the possibility of moderate symptoms that may be impacting your daily life. It's important to take these signs seriously and consider seeking support. Please reach out to our mental health expert for confidential support on WhatsApp: 0729 875 368. Professional support can help you develop coping strategies and explore treatment options that may be beneficial for you.";
            } else {
                label = "Possible Severe Symptoms";
                message = "Your responses indicate the possibility of more significant symptoms that are likely impacting your daily functioning. It's important to know that help is available and effective treatments exist. Please reach out to our mental health expert for confidential support on WhatsApp: 0729 875 368. Seeking professional support is a sign of strength, and early intervention can make a significant positive difference in your mental health journey.";
            }
        }

        return { score, label, message };
    };

    const submitTest = () => {
        if (!currentTest) return;
        setLoading(true);
        setStep(currentTest.questions.length + 1); // Loading state index

        const totalScore = answers.reduce((a, b) => a + b, 0);

        // Simulate brief loading for better UX
        setTimeout(() => {
            const result = analyzeScore(totalScore, currentTest.maxScore, currentTest.id, currentTest.name);
            setResult(result);
            setStep(currentTest.questions.length + 2); // Result state index
            setLoading(false);
        }, 800);
    };

    const getScoreColor = (score: number, max: number, testId: string) => {
        const ratio = score / max;
        // WHO-5: High score is good
        if (testId === 'who5') {
            if (ratio > 0.5) return "text-green-500";
            if (ratio > 0.28) return "text-yellow-500"; // < 50 is cutoff for screening
            return "text-red-500";
        }
        // Others: Low score is good
        if (ratio < 0.25) return "text-green-500";
        if (ratio < 0.5) return "text-yellow-500";
        if (ratio < 0.75) return "text-orange-500";
        return "text-red-500";
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <AnimatePresence mode="wait">

                    {/* SELECTION SCREEN */}
                    {step === 0 && (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-center">Choose an Assessment</DialogTitle>
                                <DialogDescription className="text-center">
                                    Select a self-check tool that matches how you are feeling.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-3 py-2">
                                {ASSESSMENTS.map((test) => (
                                    <div
                                        key={test.id}
                                        onClick={() => startTest(test.id)}
                                        className="flex items-center p-4 border rounded-xl hover:bg-slate-50 cursor-pointer transition-all hover:border-primary/50 group"
                                    >
                                        <div className="p-2 bg-primary/10 rounded-full text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                            {test.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900">{test.name}</h3>
                                            <p className="text-sm text-muted-foreground">{test.description}</p>
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* QUESTIONS SCREEN */}
                    {currentTest && step >= 1 && step <= currentTest.questions.length && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <DialogHeader>
                                <DialogTitle className="text-xl text-center mb-1">{currentTest.name}</DialogTitle>
                                <DialogDescription className="text-center">
                                    Question {step} of {currentTest.questions.length}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="py-6">
                                <h3 className="text-lg font-medium text-center mb-6 min-h-[60px] flex items-center justify-center px-4">
                                    "{currentTest.questions[step - 1]}"
                                </h3>

                                <RadioGroup
                                    value={answers[step - 1] !== -1 ? answers[step - 1].toString() : ""}
                                    onValueChange={(val) => handleAnswer(parseInt(val))}
                                    className="space-y-3"
                                >
                                    {currentTest.options.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                                            onClick={() => handleAnswer(option.value)}>
                                            <RadioGroupItem value={option.value.toString()} id={`opt-${option.value}`} />
                                            <Label htmlFor={`opt-${option.value}`} className="flex-grow cursor-pointer font-normal">
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <DialogFooter className="flex justify-between sm:justify-between">
                                <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : setStep(0)}>
                                    Back
                                </Button>
                                <Button onClick={handleNext} disabled={answers[step - 1] === -1}>
                                    {step === currentTest.questions.length ? "Finish" : "Next"}
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    )}

                    {/* LOADING SCREEN */}
                    {currentTest && step === currentTest.questions.length + 1 && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-12"
                        >
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p className="text-lg text-muted-foreground">Analyzing your responses...</p>
                        </motion.div>
                    )}

                    {/* RESULT SCREEN */}
                    {currentTest && result && step === currentTest.questions.length + 2 && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-center">Your Wellness Report</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6">
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1 opacity-70">{currentTest.name} Score</p>
                                    <div className={`text-4xl font-bold ${getScoreColor(result.score, currentTest.maxScore, currentTest.id)} mb-2`}>
                                        {result.score} / {currentTest.maxScore}
                                    </div>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-white shadow-sm ${getScoreColor(result.score, currentTest.maxScore, currentTest.id)}`}>
                                        {result.label !== "Analysis Unavailable" && <CheckCircle2 size={16} />}
                                        {result.label}
                                    </div>
                                </div>

                                <div className="prose prose-sm max-w-none text-slate-600 bg-white p-4 rounded-lg border border-slate-100 shadow-sm leading-relaxed whitespace-pre-line">
                                    {result.message}
                                </div>

                                <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-start gap-3">
                                    <MessageCircle className="text-green-600 shrink-0 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-green-800 font-medium mb-1">Professional Support Available</p>
                                        <p className="text-sm text-green-700">
                                            Please reach out to our mental health expert for confidential support on WhatsApp:
                                            <a
                                                href="https://wa.me/254729875368"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-bold block mt-1 hover:underline flex items-center gap-1"
                                            >
                                                0729 875 368
                                                <MessageCircle size={14} className="inline" />
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-2">
                                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white" size="lg" asChild>
                                        <a href="https://wa.me/254729875368" target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="mr-2" />
                                            Chat on WhatsApp
                                        </a>
                                    </Button>
                                    <Button variant="outline" onClick={() => handleOpenChange(false)}>
                                        Close
                                    </Button>
                                </div>

                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    ⚠️ This test is not a medical diagnosis. It is a self-check tool designed to offer support and guidance.
                                </p>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};
