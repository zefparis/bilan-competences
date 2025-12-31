/**
 * PERSPECTA PDF - Composant RadarChart
 * Graphique radar pour les valeurs professionnelles
 */

import React from 'react';
import { View, Text, Svg, Polygon, Circle, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, fonts } from '../styles/tokens';
import { ProfessionalValue } from '../data/types';

interface RadarChartProps {
  values: ProfessionalValue[];
  size?: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  legendContainer: {
    marginTop: spacing.md,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  legendName: {
    flex: 1,
    fontFamily: fonts.primary,
    fontSize: fontSizes.sm,
    color: colors.neutral[700],
  },
  legendDots: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 2,
  },
  dotFilled: {
    backgroundColor: colors.primary.blue,
  },
  dotEmpty: {
    backgroundColor: colors.neutral[200],
  },
  legendScore: {
    fontFamily: fonts.primaryBold,
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    width: 30,
    textAlign: 'right',
  },
});

export const RadarChart: React.FC<RadarChartProps> = ({ values, size = 180 }) => {
  const center = size / 2;
  const maxRadius = size * 0.4;
  const numPoints = values.length;

  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / numPoints - Math.PI / 2;
    const radius = (value / 5) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Points du polygone de fond (max = 5)
  const backgroundPoints = Array.from({ length: numPoints }, (_, i) => {
    const p = getPoint(i, 5);
    return `${p.x},${p.y}`;
  }).join(' ');

  // Points des valeurs
  const valuePoints = values
    .map((v, i) => {
      const p = getPoint(i, v.satisfaction);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  // Grilles intermédiaires
  const gridLevels = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grilles de fond */}
        {gridLevels.map((level) => {
          const gridPoints = Array.from({ length: numPoints }, (_, i) => {
            const p = getPoint(i, level);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <Polygon
              key={level}
              points={gridPoints}
              fill="none"
              stroke={colors.neutral[200]}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Polygone de fond */}
        <Polygon
          points={backgroundPoints}
          fill={colors.neutral[100]}
          stroke={colors.neutral[300]}
          strokeWidth={1}
        />

        {/* Lignes du centre vers les sommets */}
        {Array.from({ length: numPoints }, (_, i) => {
          const p = getPoint(i, 5);
          return (
            <Polygon
              key={`line-${i}`}
              points={`${center},${center} ${p.x},${p.y}`}
              stroke={colors.neutral[200]}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Polygone des valeurs */}
        <Polygon
          points={valuePoints}
          fill={`${colors.primary.blue}30`}
          stroke={colors.primary.blue}
          strokeWidth={2}
        />

        {/* Points sur le polygone */}
        {values.map((v, i) => {
          const p = getPoint(i, v.satisfaction);
          return (
            <Circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={colors.primary.blue}
            />
          );
        })}
      </Svg>

      {/* Légende avec dots */}
      <View style={styles.legendContainer}>
        {values.map((value, idx) => (
          <View key={idx} style={styles.legendItem}>
            <Text style={styles.legendName}>{value.name}</Text>
            <View style={styles.legendDots}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <View
                  key={dot}
                  style={[
                    styles.dot,
                    dot <= value.satisfaction ? styles.dotFilled : styles.dotEmpty,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.legendScore}>{value.satisfaction}/5</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RadarChart;
