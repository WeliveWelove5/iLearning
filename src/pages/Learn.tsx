import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Brain,
  Headphones,
  Mic,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Volume2,
  Check,
  X,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { useLearnStore } from "../stores/learnStore";
import confetti from "canvas-confetti";

type LearnMode = "vocabulary" | "grammar" | "listening" | "speaking";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Learn: React.FC = () => {
  const [mode, setMode] = useState<LearnMode | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const {
    flashCards,
    currentFlashCardIndex,
    isFlipped,
    grammarQuestions,
    currentGrammarIndex,
    grammarScore,
    flipCard,
    nextFlashCard,
    prevFlashCard,
    markFlashCardMastered,
    nextGrammar,
    answerGrammar,
    resetProgress,
  } = useLearnStore();

  const currentFlashCard = flashCards[currentFlashCardIndex];
  const currentGrammarQuestion = grammarQuestions[currentGrammarIndex];

  const handleGrammarAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    const isCorrect = answerGrammar(currentGrammarQuestion.id, index);
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#6366F1", "#F59E0B", "#10B981"],
      });
    }
  };

  const handleNextGrammar = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    nextGrammar();
  };

  const handleMasterFlashCard = () => {
    markFlashCardMastered(currentFlashCard.id);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#6366F1", "#F59E0B"],
    });
  };

  // Mode Selection
  if (!mode) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-white">学习模块</h1>
          <p className="text-gray-400 mt-1">选择你想要练习的学习模式</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: "vocabulary" as const,
              title: "单词记忆",
              description: "通过闪卡记忆单词，支持发音和例句",
              icon: BookOpen,
              color: "from-primary-500 to-primary-600",
              bgColor: "bg-primary-500/20",
            },
            {
              id: "grammar" as const,
              title: "语法练习",
              description: "选择题形式练习语法知识点",
              icon: Brain,
              color: "from-accent-500 to-accent-600",
              bgColor: "bg-accent-500/20",
            },
            {
              id: "listening" as const,
              title: "听力训练",
              description: "听音频完成听写和理解练习",
              icon: Headphones,
              color: "from-green-500 to-green-600",
              bgColor: "bg-green-500/20",
            },
            {
              id: "speaking" as const,
              title: "口语跟读",
              description: "跟读句子，练习发音和语调",
              icon: Mic,
              color: "from-purple-500 to-purple-600",
              bgColor: "bg-purple-500/20",
            },
          ].map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card
                className="h-full cursor-pointer group"
                onClick={() => setMode(item.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-7 h-7 text-transparent bg-gradient-to-br ${item.color} bg-clip-text`} style={{ color: item.id === "vocabulary" ? "#6366F1" : item.id === "grammar" ? "#F59E0B" : item.id === "listening" ? "#10B981" : "#8B5CF6" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Vocabulary Mode
  if (mode === "vocabulary") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setMode(null)} leftIcon={<ChevronLeft className="w-4 h-4" />}>
            返回
          </Button>
          <div className="text-sm text-gray-400">
            {currentFlashCardIndex + 1} / {flashCards.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-dark-card rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentFlashCardIndex + 1) / flashCards.length) * 100}%` }}
          />
        </div>

        {/* Flash Card */}
        <div className="relative h-80 mb-8">
          <motion.div
            className={`absolute inset-0 cursor-pointer ${isFlipped ? "flipped" : ""}`}
            onClick={flipCard}
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <Card className="absolute inset-0 flex flex-col items-center justify-center backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                <span className="text-sm text-gray-500 mb-4">点击翻转</span>
                <h2 className="text-4xl font-bold text-white mb-2">{currentFlashCard.front}</h2>
                <p className="text-gray-400">{currentFlashCard.pronunciation}</p>
              </Card>

              {/* Back */}
              <Card
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-sm text-gray-500 mb-4">翻译</span>
                <h2 className="text-3xl font-bold text-white mb-4">{currentFlashCard.back}</h2>
                <Button
                  variant="secondary"
                  leftIcon={<Volume2 className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Play pronunciation
                  }}
                >
                  播放发音
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            onClick={prevFlashCard}
            disabled={currentFlashCardIndex === 0}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            上一个
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => {
              flipCard();
              setTimeout(() => flipCard(), 100);
            }}
            leftIcon={<RotateCw className="w-4 h-4" />}
          >
            重置
          </Button>

          <Button
            onClick={handleMasterFlashCard}
            leftIcon={<Check className="w-4 h-4" />}
            disabled={currentFlashCard.mastered}
          >
            {currentFlashCard.mastered ? "已掌握" : "标记掌握"}
          </Button>

          <Button
            onClick={nextFlashCard}
            disabled={currentFlashCardIndex === flashCards.length - 1}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            下一个
          </Button>
        </div>
      </motion.div>
    );
  }

  // Grammar Mode
  if (mode === "grammar") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setMode(null)} leftIcon={<ChevronLeft className="w-4 h-4" />}>
            返回
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              得分: {grammarScore}/{grammarQuestions.length}
            </span>
            <span className="text-sm text-gray-400">
              {currentGrammarIndex + 1} / {grammarQuestions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-dark-card rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentGrammarIndex + 1) / grammarQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <Card className="mb-6">
          <h3 className="text-lg text-white mb-6">{currentGrammarQuestion.question}</h3>

          <div className="space-y-3">
            {currentGrammarQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentGrammarQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleGrammarAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showCorrect
                      ? "border-green-500 bg-green-500/10"
                      : showWrong
                      ? "border-red-500 bg-red-500/10"
                      : isSelected
                      ? "border-primary-500 bg-primary-500/10"
                      : "border-dark-border hover:border-primary-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white">{option}</span>
                    {showCorrect && <Check className="w-5 h-5 text-green-500" />}
                    {showWrong && <X className="w-5 h-5 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="bg-dark-bg/50">
                <h4 className="font-medium text-white mb-2">解析</h4>
                <p className="text-gray-400">{currentGrammarQuestion.explanation}</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-end">
          <Button
            onClick={handleNextGrammar}
            disabled={!showResult || currentGrammarIndex === grammarQuestions.length - 1}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            下一题
          </Button>
        </div>
      </motion.div>
    );
  }

  // Listening Mode (Placeholder)
  if (mode === "listening") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Button variant="ghost" onClick={() => setMode(null)} className="mb-6" leftIcon={<ChevronLeft className="w-4 h-4" />}>
          返回
        </Button>

        <Card className="py-16">
          <Headphones className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">听力训练</h2>
          <p className="text-gray-400 mb-6">功能开发中，敬请期待...</p>
          <Button onClick={() => setMode(null)}>选择其他模式</Button>
        </Card>
      </motion.div>
    );
  }

  // Speaking Mode (Placeholder)
  if (mode === "speaking") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Button variant="ghost" onClick={() => setMode(null)} className="mb-6" leftIcon={<ChevronLeft className="w-4 h-4" />}>
          返回
        </Button>

        <Card className="py-16">
          <Mic className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">口语跟读</h2>
          <p className="text-gray-400 mb-6">功能开发中，敬请期待...</p>
          <Button onClick={() => setMode(null)}>选择其他模式</Button>
        </Card>
      </motion.div>
    );
  }

  return null;
};
