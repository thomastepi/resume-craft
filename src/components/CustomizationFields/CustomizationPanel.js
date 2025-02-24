import React from "react";
import { Dropdown, Space, ColorPicker } from "antd";
import { DownOutlined } from "@ant-design/icons";

const CustomizationPanel = ({
  selectedLayout,
  setWritingStyle,
  writingStyle,
  setFontChoice,
  fontChoice,
  themeColor,
  setThemeColor,
  optimizeForATS,
  setOptimizeForATS,
  selectedLanguage,
  setSelectedLanguage,
  setSelectedLayout,
}) => {
  return (
    <>
      <div className="resume-customization-panel">
        <div className="options-section">
          <label className="options-label">Resume Language</label>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "English" },
                { key: "2", label: "French" },
                { key: "3", label: "Spanish" },
              ].map((lang) => ({
                key: lang.key,
                label: (
                  <span
                    onClick={() => setSelectedLanguage(lang.label)}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    {lang.label}
                  </span>
                ),
              })),
            }}
            trigger={["click"]}
          >
            <button className="dropdown-button">
              <Space>
                {selectedLanguage} <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </div>

        <div className="options-section">
          <label className="options-label">Layout</label>
          <Dropdown
            menu={{
              items: [
                { key: "single-column", label: "Single Column" },
                { key: "two-column", label: "Two Column" },
                { key: "compact", label: "Compact" },
                { key: "expanded", label: "Expanded" },
              ].map((layout) => ({
                key: layout.key,
                label: (
                  <span
                    onClick={() => setSelectedLayout(layout.label)}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    {layout.label}
                  </span>
                ),
              })),
              selectable: true,
            }}
            trigger={["click"]}
          >
            <button className="dropdown-button">
              <Space>
                {selectedLayout} <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </div>

        <div className="options-section">
          <label className="options-label">Writing Style</label>
          <Dropdown
            menu={{
              items: [
                { key: "Professional", label: "Professional & Formal" },
                { key: "Friendly", label: "Friendly & Conversational" },
                { key: "Technical", label: "Technical & Analytical" },
              ].map((style) => ({
                key: style.key,
                label: (
                  <span
                    onClick={() => setWritingStyle(style.key)}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    {style.label}
                  </span>
                ),
              })),
            }}
            trigger={["click"]}
          >
            <button className="dropdown-button">
              <Space>
                {writingStyle} <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </div>

        <div className="options-section">
          <label className="options-label">Font Choice</label>
          <Dropdown
            menu={{
              items: [
                { key: "Serif", label: "Serif (Times New Roman)" },
                { key: "Sans-serif", label: "Sans-serif (Arial)" },
                { key: "Monospace", label: "Monospace (Courier New)" },
              ].map((font) => ({
                key: font.key,
                label: (
                  <span
                    onClick={() => setFontChoice(font.key)}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    {font.label}
                  </span>
                ),
              })),
            }}
            trigger={["click"]}
          >
            <button className="dropdown-button">
              <Space>
                {fontChoice} <DownOutlined />
              </Space>
            </button>
          </Dropdown>
        </div>

        <div className="options-section">
          <label className="options-label">Theme Colors</label>
          <ColorPicker
            defaultValue="rgb(0, 150, 136)"
            showText
            allowClear
            defaultFormat="rgb"
            value={themeColor}
            onChange={(color) => setThemeColor(color.toRgbString())}
            placement="bottomLeft"
          />
        </div>

        <div className="options-section">
          <label className="options-label">Optimize for ATS</label>
          <input
            type="checkbox"
            checked={optimizeForATS}
            onChange={() => setOptimizeForATS(!optimizeForATS)}
          />
        </div>
      </div>
    </>
  );
};

export default CustomizationPanel;
